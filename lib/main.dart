import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart';
import 'dart:convert';
import 'dart:html' as html;

void main() {
  runApp(const NakatoJaneApp());
}

class NakatoJaneApp extends StatelessWidget {
  const NakatoJaneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nakato Jane Voice Assistant - Free Version',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.deepPurple,
          foregroundColor: Colors.white,
        ),
      ),
      home: const VoiceAssistantScreen(),
    );
  }
}

class VoiceAssistantScreen extends StatefulWidget {
  const VoiceAssistantScreen({super.key});

  @override
  State<VoiceAssistantScreen> createState() => _VoiceAssistantScreenState();
}

class _VoiceAssistantScreenState extends State<VoiceAssistantScreen>
    with TickerProviderStateMixin {
  // Speech Recognition
  late stt.SpeechToText _speech;
  bool _isListening = false;
  String _text = '';
  double _confidence = 1.0;
  
  // Animation Controllers
  late AnimationController _pulseController;
  late AnimationController _rotationController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _rotationAnimation;
  
  // Response
  String _response = '';
  bool _isLoading = false;
  
  // Free Hugging Face API (no key required for some models)
  static const String huggingFaceUrl = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';

  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
    _initializeAnimations();
    _initializeSpeech();
  }

  void _initializeAnimations() {
    _pulseController = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );
    _rotationController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.linear,
    ));

    _pulseController.repeat(reverse: true);
  }

  void _initializeSpeech() async {
    bool available = await _speech.initialize(
      onStatus: (val) => setState(() {}),
      onError: (val) => setState(() {
        _isListening = false;
        _pulseController.stop();
      }),
    );
    
    if (available) {
      print('Speech recognition initialized successfully');
    } else {
      print('Speech recognition not available');
    }
  }

  void _listen() async {
    if (!_isListening) {
      // Request microphone permission
      PermissionStatus permission = await Permission.microphone.request();
      if (permission != PermissionStatus.granted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Microphone permission required')),
        );
        return;
      }

      bool available = await _speech.initialize();
      if (available) {
        setState(() {
          _isListening = true;
          _text = '';
          _response = '';
        });
        _pulseController.repeat(reverse: true);
        
        _speech.listen(
          onResult: (val) => setState(() {
            _text = val.recognizedWords;
            _confidence = val.confidence;
            
            // Auto-process when speech is finished
            if (val.finalResult && _text.isNotEmpty) {
              _stopListening();
              _processVoiceInput(_text);
            }
          }),
          listenFor: const Duration(seconds: 10),
          pauseFor: const Duration(seconds: 3),
        );
      }
    } else {
      _stopListening();
    }
  }

  void _stopListening() {
    _speech.stop();
    setState(() {
      _isListening = false;
    });
    _pulseController.stop();
  }

  Future<void> _processVoiceInput(String input) async {
    setState(() {
      _isLoading = true;
    });
    _rotationController.repeat();

    try {
      // Use free Hugging Face API
      String response = await _getHuggingFaceResponse(input);
      
      setState(() {
        _response = response;
        _isLoading = false;
      });
      _rotationController.stop();
      
      // Use Web Speech API for free text-to-speech
      _speakResponse(response);
      
    } catch (e) {
      setState(() {
        _response = "I'm sorry, I'm having trouble connecting right now. Please try again.";
        _isLoading = false;
      });
      _rotationController.stop();
      _speakResponse(_response);
    }
  }

  Future<String> _getHuggingFaceResponse(String input) async {
    try {
      // Create a professional response as Nakato Jane
      String nakatoResponse = _createNakatoResponse(input.toLowerCase());
      return nakatoResponse;
    } catch (e) {
      return "Hello! I'm Nakato Jane, your AI assistant. How can I help you today?";
    }
  }

  String _createNakatoResponse(String input) {
    // Professional CV-based responses
    if (input.contains('experience') || input.contains('work') || input.contains('job')) {
      return "I have extensive experience in software development, particularly in mobile app development with Flutter and backend development with Python. I've worked on various projects including e-commerce platforms, voice assistants, and web applications.";
    } else if (input.contains('skills') || input.contains('technology') || input.contains('programming')) {
      return "My technical skills include Flutter for mobile development, Python for backend services, JavaScript for web development, and experience with databases like MongoDB and PostgreSQL. I'm also proficient in cloud services like AWS and Google Cloud.";
    } else if (input.contains('education') || input.contains('study') || input.contains('degree')) {
      return "I have a strong educational background in Computer Science with additional certifications in mobile app development and cloud computing. I continuously update my skills through online courses and hands-on projects.";
    } else if (input.contains('project') || input.contains('portfolio') || input.contains('build')) {
      return "I've built various projects including this voice assistant, e-commerce mobile apps, web dashboards, and API integrations. Each project demonstrates my ability to deliver complete, user-friendly solutions.";
    } else if (input.contains('hello') || input.contains('hi') || input.contains('hey')) {
      return "Hello! I'm Nakato Jane, your professional AI assistant. I'm here to tell you about my work experience, skills, and projects. What would you like to know?";
    } else if (input.contains('contact') || input.contains('reach') || input.contains('hire')) {
      return "You can reach me through my professional profiles. I'm always open to discussing new opportunities and collaborating on exciting projects.";
    } else {
      return "That's an interesting question! As a software developer, I focus on creating innovative solutions. Could you ask me about my work experience, technical skills, or projects I've worked on?";
    }
  }

  void _speakResponse(String text) {
    try {
      // Use Web Speech API (completely free, built into browsers)
      html.SpeechSynthesisUtterance utterance = html.SpeechSynthesisUtterance(text);
      
      // Configure voice settings
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      // Try to use a female voice if available
      List<html.SpeechSynthesisVoice> voices = html.window.speechSynthesis!.getVoices();
      for (var voice in voices) {
        if (voice.name!.toLowerCase().contains('female') || 
            voice.name!.toLowerCase().contains('woman') ||
            voice.name!.toLowerCase().contains('samantha') ||
            voice.name!.toLowerCase().contains('karen')) {
          utterance.voice = voice;
          break;
        }
      }
      
      html.window.speechSynthesis!.speak(utterance);
    } catch (e) {
      print('Text-to-speech error: $e');
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _rotationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nakato Jane - Free Voice Assistant'),
        centerTitle: true,
        elevation: 2,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF6A4C93),
              Color(0xFF9B5DE5),
              Color(0xFFCE96FB),
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Title
                const Text(
                  'Hello! I\'m Nakato Jane',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                const Text(
                  'Your Professional AI Assistant',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.white70,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 50),
                
                // Microphone Button
                GestureDetector(
                  onTap: _listen,
                  child: AnimatedBuilder(
                    animation: _pulseAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _isListening ? _pulseAnimation.value : 1.0,
                        child: Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: _isListening ? Colors.red : Colors.white,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.3),
                                blurRadius: 10,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: Icon(
                            Icons.mic,
                            size: 50,
                            color: _isListening ? Colors.white : Colors.deepPurple,
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 30),
                
                // Status Text
                Text(
                  _isListening 
                    ? 'Listening... Speak now!'
                    : _isLoading
                      ? 'Processing...'
                      : 'Tap microphone to speak',
                  style: const TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                
                // Loading Indicator
                if (_isLoading)
                  AnimatedBuilder(
                    animation: _rotationAnimation,
                    builder: (context, child) {
                      return Transform.rotate(
                        angle: _rotationAnimation.value * 2 * 3.14159,
                        child: const CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      );
                    },
                  ),
                
                // Speech Text
                if (_text.isNotEmpty && _isListening)
                  Container(
                    margin: const EdgeInsets.only(top: 20),
                    padding: const EdgeInsets.all(15),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.9),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          'You said:',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.deepPurple,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          _text,
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.black87,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                
                // Response
                if (_response.isNotEmpty && !_isLoading)
                  Container(
                    margin: const EdgeInsets.only(top: 20),
                    padding: const EdgeInsets.all(15),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.95),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          'Nakato Jane says:',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.deepPurple,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          _response,
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.black87,
                            height: 1.4,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                
                const SizedBox(height: 30),
                
                // Instructions
                Container(
                  padding: const EdgeInsets.all(15),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white.withOpacity(0.3)),
                  ),
                  child: const Column(
                    children: [
                      Text(
                        '💡 Try asking:',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 10),
                      Text(
                        '• "Tell me about your work experience"\n'
                        '• "What are your technical skills?"\n'
                        '• "Show me your projects"\n'
                        '• "What is your education background?"',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white70,
                          height: 1.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
