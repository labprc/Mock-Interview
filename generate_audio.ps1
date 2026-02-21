# PowerShell script for generating audio files with Windows TTS
# Deep male voice using Microsoft David

Add-Type -AssemblyName System.Speech

$audioFolder = "c:\Users\vedan\OneDrive\Desktop\mock\frontend\public\audio"
$count = 0

Write-Host "🎤 Generating 25 audio files with DEEP MALE VOICE..."
Write-Host "📁 Saving to: $audioFolder"
Write-Host "🔊 Voice: Professional Male (Deep Testosterone Tone)`n"

# Create synth engine
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Volume = 100
$synth.Rate = -3

# Define questions
$q1 = "What are the SOLID principles in object-oriented programming? Take your time and explain each principle and why they are important."
$q2 = "Can you explain the difference between synchronous and asynchronous programming? Please provide some examples of when you would use each approach."
$q3 = "What is a RESTful API and what are its key principles? How do you implement REST in your applications?"
$q4 = "What are the benefits and drawbacks of microservices architecture? When would you recommend using microservices?"
$q5 = "Tell me about version control and why it is important in software development. What tools have you used?"
$q6 = "What is the difference between supervised and unsupervised learning? Can you give me examples of each?"
$q7 = "What is overfitting in machine learning? How can we prevent it and why is it important?"
$q8 = "Walk me through the steps in a typical data science project. What is your process?"
$q9 = "What are the differences between correlation and causation? Why is this distinction important?"
$q10 = "How do you handle missing data in a dataset? Tell me about the techniques you have used."

$questions = @(
    @{name="software_dev_q1.mp3"; text=$q1},
    @{name="software_dev_q2.mp3"; text=$q2},
    @{name="software_dev_q3.mp3"; text=$q3},
    @{name="software_dev_q4.mp3"; text=$q4},
    @{name="software_dev_q5.mp3"; text=$q5},
    @{name="data_science_q1.mp3"; text=$q6},
    @{name="data_science_q2.mp3"; text=$q7},
    @{name="data_science_q3.mp3"; text=$q8},
    @{name="data_science_q4.mp3"; text=$q9},
    @{name="data_science_q5.mp3"; text=$q10}
)

foreach ($q in $questions) {
    $count++
    Write-Host "[$count/25] ⏳ Generating: $($q.name)" -NoNewline
    $filePath = Join-Path $audioFolder $q.name
    try {
        $synth.SetOutputToWaveFile($filePath.Replace('.mp3', '.wav'))
        $synth.Speak($q.text)
        $synth.Dispose()
        Write-Host " ✅"
    } catch {
        Write-Host " ❌"
    }
}

Write-Host "`n============================================================"
Write-Host "✨ Audio files generation complete!"
Write-Host "🎉 Your interview app is ready!"
Write-Host "============================================================"
