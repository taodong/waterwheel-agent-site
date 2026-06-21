#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

<#
Creates the host folder structure required by deployment/waterwheel/docker-compose.yml bind mounts.
Usage:
  ./create-sync-subfolders.ps1
  ./create-sync-subfolders.ps1 C:\path\to\sync
If no path is provided, current directory is used.
If a path is provided but does not exist, it is created first.
#>
param(
  [string]$BasePath = ''
)

if ([string]::IsNullOrWhiteSpace($BasePath)) {
  $BasePath = (Get-Location).Path
  Write-Host "No base path provided; using current directory: $BasePath"
} elseif (-not (Test-Path -Path $BasePath -PathType Container)) {
  New-Item -ItemType Directory -Path $BasePath -Force | Out-Null
  Write-Host "Created base path: $BasePath"
}

$dirs = @(
  (Join-Path $BasePath 'agent/instructions'),
  (Join-Path $BasePath 'agent/tasks'),
  (Join-Path $BasePath 'agent/outputs')
)

foreach ($d in $dirs) {
  New-Item -ItemType Directory -Path $d -Force | Out-Null
  Write-Host "Created: $d"
}

Write-Host 'Done.'
