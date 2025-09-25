from google.cloud import speech

speech_client = speech.SpeechClient()

@app.post("/api/audio_to_text", dependencies=[Depends(require_api_key)])
async def audio_to_text(file: UploadFile = File(...), language_code: str = "en-US"):
    try:
        # Read file bytes
        content = await file.read()

        # Configure STT request
        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # adjust based on input
            language_code=language_code,
            enable_automatic_punctuation=True,
        )

        response = speech_client.recognize(config=config, audio=audio)

        transcript = ""
        for result in response.results:
            transcript += result.alternatives[0].transcript + " "

        return {"transcript": transcript.strip()}

    except Exception as e:
        logging.exception("Speech-to-Text failed")
        raise HTTPException(500, "Audio transcription failed")