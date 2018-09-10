---
layout: post
title: Send email notification using PowerShell script
description: Automate your task for sending email notification with PowerShell script and Windows SMTP Client.
keywords: software build automation, send email notification, using smtp client in powershell, software build notification
tags: [PowerShell, Programming]
comments: true
---

At work, I have been implementing software build automation in Windows environment, and it's part of my day job as Build and Release Engineer. Some of the automation tools have been internally developed by myself. But, there is one common task that is being used a lot. It is to send email notification. This is because people want everything to be delivered to their email. Since most of the tasks are written in PowerShell script by myself. To accomplish that, I wrote a script in PowerShell to send the email notification.

The PowerShell script below is how I accomplished the task for sending email notification. The script does not cover all the source code, but you will the idea how it works and to get started with yours.

```powershell
# 1. SETTING UP NECESSARY PARAMETERS
$emailTo = "user1@email.com,user2@example.com" # Separate by comma for multiple email addresses
$emailCC = "user3@email.com,user4@example.com" # Separate by comma for multiple email addresses
$emailFrom = "sender@email.com"
$emailFromDisplayName = "Auto Email Notification"
$smtpServer = "smtp.yourserver.com"
$smtpPort = 0 # 0 = not in use
$enableSSL = $false
$useDefaultCredentials = $true # Set to $false for Network Credentials
$username = "" # Provide this when $useDefaultCredentials = $false
$password = "" # Provide this when $useDefaultCredentials = $false
$useHTML = $true
$priority = [System.Net.Mail.MailPriority]::Normal # Low|Normal|High

# 2. ACQUIRING DATA OR INFO, INTERPRET IT AND PROCESS THE RESULT HERE
# Many things you can do here...

# 3. CREATING MESSAGE BODY
# Generally I use HTML for email message body.
$html_var1 = "..."
$html_var2 = "..."
$html_var3 = "..."
$emailBody = $html_var1 + $html_var2 + $html_var3

# 4. CREATING EMAIL SUBJECT
# Sometimes I decide the email subject at last, or auto-generate it.
$emailSubject = "..."

# 5. SENDING EMAIL...
# You might want to do checking/validation beforehand for necessary variables
$mailMessage = New-Object System.Net.Mail.MailMessage
if ($emailFromDisplayName -eq "" -or $emailFromDisplayName -eq $null) {
    $mailMessage.From = New-Object System.Net.Mail.MailAddress($emailFrom)
} else {
    $mailMessage.From = New-Object System.Net.Mail.MailAddress($emailFrom, $emailFromDisplayName)
}
$mailMessage.To.Add($emailTo)
if ($emailCC -ne "") {
    $mailMessage.CC.Add($emailCC)
}
$mailMessage.Subject = $emailSubject
$mailMessage.Body = $emailBody
$mailMessage.IsBodyHtml = $useHTML
$mailMessage.Priority = $priority

$smtp = $null
if ($smtpPort -ne 0) {
    $smtp = New-Object System.Net.Mail.SmtpClient($smtpServer, $smtpPort)
} else {
    $smtp = New-Object System.Net.Mail.SmtpClient($smtpServer)
}
$smtp.EnableSsl = $enableSSL
$smtp.DeliveryMethod = [System.Net.Mail.SmtpDeliveryMethod]::Network

if ($useDefaultCredentials -eq $true) {
    $smtp.UseDefaultCredentials = $true
} else {
    $smtp.UseDefaultCredentials = $false
    $smtp.Credentials = New-Object System.Net.NetworkCredential($username, $password)
}

try {
    Write-Output "Sending email notification..."
    $smtp.Send($mailMessage)
    Write-Output "Sending email notification --> Complete"
} catch {
    Write-Output "Sending email notification --> Error"
    Write-Warning ('Failed to send email: "{0}"', $_.Exception.Message)
}
```

### Here's how you can make the script executable with parameters

To execute the script from other program with some arguments to pass, you need to include `[CmdletBinding()]` and `Param()` on top of your main script code.

Example:

```powershell
[CmdletBinding()]
Param
(
    [string]$EmailTo = "",
    [string]$EmailCC = "",
    [string]$EmailFrom = "sender@example.com"
    # ...more parameters that suit your needs
    # continue here...
)

# YOUR SCRIPT GOES HERE...
```

Then, you can execute your PowerShell script this way, depending on what kind of program you use to execute the commands. Some programs may need you to provide the full path to the script file and the script parameters explicitly.

Example:

```
./EmailNotification.ps1 -EmailTo "qa-engineer@email.com" -EmailCC "manager@email.com" ...
```

### Handling the script in more proper way

Sometimes, your PowerShell script may become complex and contains hundred lines of code. In this case, you might want to organize and separate them into multiple parameterized functions. The example snippet below shows you how it should be done:

```powershell
[CmdletBinding(SupportsShouldProcess=$true, ConfirmImpact='Medium')]
[Alias()]
[OutputType([int])]
Param
(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateNotNullOrEmpty()]
    [string]$EmailTo = "",

    [Parameter(Position=1)]
    [ValidateNotNullOrEmpty()]
    [string]$EmailFrom = "sender@example.com",

    [switch]$EnableLog

    # ...more parameters that suit your needs
    # continue here...
)

function EmailNotification
{
    [CmdletBinding(SupportsShouldProcess=$true, ConfirmImpact='Medium')]
    [Alias()]
    [OutputType([int])]
    Param
    (
        [Parameter(Mandatory=$true, Position=0)]
        [ValidateNotNullOrEmpty()]
        [string]$EmailTo = "",

        [Parameter(Position=1)]
        [ValidateNotNullOrEmpty()]
        [string]$EmailFrom = "sender@example.com",

        [Parameter(Position=2)]
        [AllowEmptyString()]
        [string]$EmailFromDisplayName = "Auto-build Notification System",

        [Parameter(Position=3)]
        [ValidateNotNullOrEmpty()]
        [string]$SmtpServer = "smtp.example.com"

        # ...more parameters that suit your needs
        # continue here...
    )

    # YOUR MAIN SCRIPT GOES HERE WITH OTHER FUNCTIONS...

    # Example:
    $otherVar1 = "..."
    $otherVar2 = "..."
    $template = GenerateEmailTemplate -Var1 "..." -Var2 1 -Var3

    # Process variable $template...
    # Do other things...

    # YOUR MAIN SCRIPT ENDS HERE...
}

function GenerateEmailTemplate
{
    [CmdletBinding(SupportsShouldProcess=$true, ConfirmImpact='Medium')]
    [Alias()]
    [OutputType([string])]
    Param
    (
        [string]$Var1 = "",
        [int]$Var2 = 0,
        [switch]$Var3
    )

    # CODE TO GENERATE EMAIL TEMPLATE HTML HERE... THEN RETURN AS STRING.
}

function CreateLogFile
{
    # CODE TO GENERATE LOG FILE...
}

# This is how invocation of your script started...
if (-not ($myinvocation.line.Contains("`$here\`$sut"))) {
    if ($EnableLog -eq $true) {
        CreateLogFile
    }
    # Final call usually start at the main function
    EmailNotification -EmailTo $EmailTo -EmailFrom $EmailFrom # ...and more parameters here...
}
```