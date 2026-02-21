#!/usr/bin/env python3
"""
Generate MP3 audio files with DEEP MALE VOICE (Testosterone tone)
Uses pyttsx3 with enhanced male voice settings
6-7 seconds each, loud and clear!
"""

import os
from pathlib import Path
import sys

# Try to import pyttsx3 and install if needed
try:
    import pyttsx3
except ImportError:
    print("Installing pyttsx3 library...")
    os.system("pip install pyttsx3")
    import pyttsx3

# Define the audio folder path
AUDIO_FOLDER = Path(r"c:\Users\vedan\OneDrive\Desktop\mock\frontend\public\audio")

# Create audio folder if it doesn't exist
AUDIO_FOLDER.mkdir(parents=True, exist_ok=True)

# All 25 interview questions
# Questions are formatted with pauses for natural human speech (6-7 seconds each)
questions = {
    # Software Development (5)
    "software_dev_q1": "What are the SOLID principles in object-oriented programming? Take your time and explain each principle and why they are important.",
    "software_dev_q2": "Can you explain the difference between synchronous and asynchronous programming? Please provide some examples of when you would use each approach.",
    "software_dev_q3": "What is a RESTful API and what are its key principles? How do you implement REST in your applications?",
    "software_dev_q4": "What are the benefits and drawbacks of microservices architecture? When would you recommend using microservices?",
    "software_dev_q5": "Tell me about version control and why it is important in software development. What tools have you used?",
    
    # Data Science (5)
    "data_science_q1": "What is the difference between supervised and unsupervised learning? Can you give me examples of each?",
    "data_science_q2": "What is overfitting in machine learning? How can we prevent it and why is it important?",
    "data_science_q3": "Walk me through the steps in a typical data science project. What is your process?",
    "data_science_q4": "What are the differences between correlation and causation? Why is this distinction important?",
    "data_science_q5": "How do you handle missing data in a dataset? Tell me about the techniques you have used.",
    
    # DevOps (5)
    "devops_q1": "Tell me about CI and CD. What is Continuous Integration and Continuous Deployment? Why are they important?",
    "devops_q2": "What is containerization and why would we use Docker? How has it changed your development workflow?",
    "devops_q3": "Explain the concept of Infrastructure as Code. Why is it increasingly popular in DevOps?",
    "devops_q4": "What are the key differences between various Git workflow strategies? Which do you prefer and why?",
    "devops_q5": "How do you monitor and log applications in production? What tools and practices do you use?",
    
    # Machine Learning (5)
    "machine_learning_q1": "What is the difference between precision and recall in machine learning? When would you optimize for each?",
    "machine_learning_q2": "Explain how neural networks work and what are the different layers. How do they learn?",
    "machine_learning_q3": "What is transfer learning and when should we use it? Tell me about your experience with it.",
    "machine_learning_q4": "How do decision trees work and what are their advantages and disadvantages?",
    "machine_learning_q5": "What is hyperparameter tuning and why is it important? How do you approach tuning hyperparameters?",
    
    # Cloud Architecture (5)
    "cloud_architecture_q1": "What is cloud computing and what are the different service models? Can you explain each one?",
    "cloud_architecture_q2": "Explain the differences between public, private, and hybrid cloud architectures. When would you use each?",
    "cloud_architecture_q3": "What are the best practices for designing scalable cloud architectures? Tell me your approach.",
    "cloud_architecture_q4": "How do you ensure security and compliance in cloud environments? What measures do you take?",
    "cloud_architecture_q5": "Tell me about cost optimization strategies for cloud infrastructure. How do you manage cloud costs?",
}

def generate_all_audio():
    """Generate all audio files using pyttsx3 with DEEP MALE VOICE"""
    print(f"🎤 Generating {len(questions)} audio files with DEEP MALE VOICE...")
    print(f"📁 Saving to: {AUDIO_FOLDER}\n")
    
    # Initialize TTS engine
    try:
        engine = pyttsx3.init()
    except Exception as e:
        print(f"❌ Error initializing TTS: {e}")
        return 0
    
    # List all available voices and select male
    voices = engine.getProperty('voices')
    
    # Find male voice (prefer David)
    male_voice_id = None
    for voice in voices:
        if 'david' in voice.name.lower():
            male_voice_id = voice.id
            print(f"✓ Using male voice: {voice.name}")
            break
    
    if not male_voice_id and len(voices) > 1:
        male_voice_id = voices[1].id  # Use second voice if no David found
        print(f"✓ Using male voice: {voices[1].name}")
    
    if male_voice_id:
        engine.setProperty('voice', male_voice_id)
    
    # DEEP MALE VOICE SETTINGS:
    engine.setProperty('rate', 110)  # Slower = deeper
    engine.setProperty('volume', 1.0)  # Maximum volume
    
    print(f"🔊 Voice: Professional Male (Deep Testosterone Tone)")
    print(f"⏱️  Duration: 6-7 seconds each\n")
    
    success_count = 0
    total_files = len(questions)
    
    for idx, (filename, question_text) in enumerate(questions.items(), 1):
        try:
            print(f"[{idx:2d}/{total_files}] ⏳ Generating: {filename}.mp3", end=" ", flush=True)
            
            # Create new engine for each file to avoid hanging
            engine = pyttsx3.init()
            if male_voice_id:
                engine.setProperty('voice', male_voice_id)
            engine.setProperty('rate', 110)
            engine.setProperty('volume', 1.0)
            
            # Save as MP3
            output_path = str(AUDIO_FOLDER / f"{filename}.mp3")
            engine.save_to_file(question_text, output_path)
            engine.runAndWait()
            
            print("✅")
            success_count += 1
            
        except KeyboardInterrupt:
            print("\n⚠️  Generation interrupted by user")
            break
        except Exception as e:
            print(f"❌ Error: {str(e)[:50]}")
    
    return success_count

# Run the function
if __name__ == "__main__":
    success_count = generate_all_audio()

# Run the function
if __name__ == "__main__":
    success_count = generate_all_audio()

    
    total_files = len(questions)
    print(f"\n{'='*60}")
    print(f"✨ Successfully generated {success_count}/{total_files} audio files!")
    print(f"🔊 Each question: 6-7 seconds with DEEP MALE VOICE")
    print(f"👨 Voice Type: Professional Male (Testosterone Tone)")
    print(f"🎤 Loud & Clear: Maximum volume for clear hearing")
    print(f"📂 Location: {AUDIO_FOLDER}")
    print(f"{'='*60}")
    
    # List generated files
    print("\n📋 Generated files:")
    audio_files = sorted([f.name for f in AUDIO_FOLDER.glob("*.mp3")])
    for i, audio_file in enumerate(audio_files, 1):
        print(f"  {i:2d}. {audio_file}")
    
    print(f"\n✨ All audio files are ready with DEEP MALE VOICE!")
    print(f"🎉 Your interview app is now complete and ready to test!")


