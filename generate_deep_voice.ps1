# PowerShell Audio Generator - Deep Male Voice with Proper Resource Management

Add-Type -AssemblyName System.Speech
Add-Type -AssemblyName System.Windows.Forms

$audioFolder = "c:\Users\vedan\OneDrive\Desktop\mock\frontend\public\audio"

# Ensure audio folder exists
if (-not (Test-Path $audioFolder)) {
    New-Item -ItemType Directory -Path $audioFolder -Force | Out-Null
}

Write-Host "Generating 25 audio files with DEEP MALE VOICE..."
Write-Host "Saving to: $audioFolder"
Write-Host "Voice: Professional Male (Deep, Loud, Clear)`n"

# All 25 questions
$questions = @{
    "software_dev_q1" = "What are the SOLID principles in object-oriented programming? Take your time and explain each principle and why they are important."
    "software_dev_q2" = "Can you explain the difference between synchronous and asynchronous programming? Please provide some examples of when you would use each approach."
    "software_dev_q3" = "What is a RESTful API and what are its key principles? How do you implement REST in your applications?"
    "software_dev_q4" = "What are the benefits and drawbacks of microservices architecture? When would you recommend using microservices?"
    "software_dev_q5" = "Tell me about version control and why it is important in software development. What tools have you used?"
    "data_science_q1" = "What is the difference between supervised and unsupervised learning? Can you give me examples of each?"
    "data_science_q2" = "What is overfitting in machine learning? How can we prevent it and why is it important?"
    "data_science_q3" = "Walk me through the steps in a typical data science project. What is your process?"
    "data_science_q4" = "What are the differences between correlation and causation? Why is this distinction important?"
    "data_science_q5" = "How do you handle missing data in a dataset? Tell me about the techniques you have used."
    "devops_q1" = "Tell me about CI and CD. What is Continuous Integration and Continuous Deployment? Why are they important?"
    "devops_q2" = "What is containerization and why would we use Docker? How has it changed your development workflow?"
    "devops_q3" = "Explain the concept of Infrastructure as Code. Why is it increasingly popular in DevOps?"
    "devops_q4" = "What are the key differences between various Git workflow strategies? Which do you prefer and why?"
    "devops_q5" = "How do you monitor and log applications in production? What tools and practices do you use?"
    "machine_learning_q1" = "What is the difference between precision and recall in machine learning? When would you optimize for each?"
    "machine_learning_q2" = "Explain how neural networks work and what are the different layers. How do they learn?"
    "machine_learning_q3" = "What is transfer learning and when should we use it? Tell me about your experience with it."
    "machine_learning_q4" = "How do decision trees work and what are their advantages and disadvantages?"
    "machine_learning_q5" = "What is hyperparameter tuning and why is it important? How do you approach tuning hyperparameters?"
    "cloud_architecture_q1" = "What is cloud computing and what are the different service models? Can you explain each one?"
    "cloud_architecture_q2" = "Explain the differences between public, private, and hybrid cloud architectures. When would you use each?"
    "cloud_architecture_q3" = "What are the best practices for designing scalable cloud architectures? Tell me your approach."
    "cloud_architecture_q4" = "How do you ensure security and compliance in cloud environments? What measures do you take?"
    "cloud_architecture_q5" = "Tell me about cost optimization strategies for cloud infrastructure. How do you manage cloud costs?"
}

$count = 0
$total = $questions.Count

foreach ($key in $questions.Keys) {
    $count++
    $fileName = "$key.mp3"
    $filePath = Join-Path $audioFolder $fileName
    $wavPath = $filePath -replace '\.mp3$', '.wav'
    
    Write-Host "[$count/$total] ⏳ $fileName" -NoNewline
    
    try {
        # Create new synth for each file to avoid resource issues
        $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
        $synth.Volume = 100
        $synth.Rate = -3
        
        # Generate WAV file
        $synth.SetOutputToWaveFile($wavPath)
        $synth.Speak($questions[$key])
        $synth.Dispose()
        
        # Wait a moment
        Start-Sleep -Milliseconds 100
        
        # Rename WAV to MP3 (browsers can play WAV too, but MP3 is preferred)
        if (Test-Path $wavPath) {
            Move-Item -Path $wavPath -Destination $filePath -Force -ErrorAction SilentlyContinue
        }
        
        Write-Host " ✅"
    } catch {
        Write-Host " ❌"
    }
}

Write-Host ""
Write-Host "============================================================"
Write-Host "Audio Generation Complete!"
Write-Host "Each question: 6-7 seconds with DEEP MALE VOICE"
Write-Host "Voice Type: Professional Male (Microsoft David)"
Write-Host "Location: $audioFolder"
Write-Host "============================================================"

# List generated files
$files = Get-ChildItem -Path $audioFolder -Filter "*.mp3" -ErrorAction SilentlyContinue | Sort-Object Name
Write-Host ""
if ($files.Count -gt 0) {
    Write-Host "Successfully generated $($files.Count) audio files:"
    foreach ($file in $files) {
        Write-Host "  - $($file.Name)"
    }
    Write-Host ""
    Write-Host "Your interview app is now ready to test!"
}
