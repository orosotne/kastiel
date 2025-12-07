# Konverzia videa pre web

## Prečo WebM?
- **Menšia veľkosť** - WebM (VP9) je o 30-50% menší ako MP4 (H.264)
- **Lepšia kvalita** pri rovnakej bitrate
- **Podporované** vo všetkých moderných prehliadačoch

## FFmpeg príkazy

### 1. Inštalácia FFmpeg
```bash
# Windows (pomocou Chocolatey)
choco install ffmpeg

# alebo stiahnuť z https://ffmpeg.org/download.html
```

### 2. Konverzia do WebM (VP9)
```bash
ffmpeg -i hero_video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an hero_video.webm
```

### 3. Optimalizovaná verzia (odporúčané)
```bash
# Pre web - dobrý pomer kvalita/veľkosť
ffmpeg -i hero_video.mp4 -c:v libvpx-vp9 -crf 35 -b:v 1M -vf "scale=1920:-1" -an -pass 1 -f webm NUL
ffmpeg -i hero_video.mp4 -c:v libvpx-vp9 -crf 35 -b:v 1M -vf "scale=1920:-1" -an -pass 2 hero_video.webm
```

### 4. Optimalizácia MP4 (fallback)
```bash
# Kompresia existujúceho MP4
ffmpeg -i hero_video.mp4 -c:v libx264 -crf 28 -preset slow -vf "scale=1920:-1" -an hero_video_optimized.mp4
```

## Parametre
- `-crf 30-35` - kvalita (nižšie = lepšia, väčší súbor)
- `-b:v 1M` - max bitrate 1 Mbps
- `-vf "scale=1920:-1"` - max šírka 1920px
- `-an` - bez audia (pre background video)

## Umiestnenie
Výsledné súbory uložiť do:
```
public/videos/
├── hero_video.mp4      (fallback)
└── hero_video.webm     (primárny)
```

