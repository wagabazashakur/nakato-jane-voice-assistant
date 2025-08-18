# syntax=docker/dockerfile:1
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    TTS_MOCK=0 \
    PORT=8000

WORKDIR /app

# System deps for audio (libsndfile for soundfile; ffmpeg optional for conversions)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 ffmpeg build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy server code and install deps
COPY server/requirements.txt ./requirements.txt
RUN python -m pip install --upgrade pip && pip install -r requirements.txt
COPY server/ /app/server/

EXPOSE 8000

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
