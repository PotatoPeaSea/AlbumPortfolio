/* Matthew Lin portfolio: renders the page from the data below and data/media.js. */
(function(){
  function $(s,r){return (r||document).querySelector(s)}
  function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- data (from the master project and experience files) ---------- */
  var P=[
   {k:'p-rocky',t:'Rocky Five-Leg Walker',c:'#3fd1a1',ink:'#0f2a22',g:'rocky',cat:['hw','ml'],yr:'2026',tags:'KiCad · MuJoCo · PPO · Fusion 360',st:'Design + simulation',link:'https://github.com/PotatoPeaSea/Rocky',
    note:'The board is designed but not built, and every walking result is from simulation.',
    desc:{why:'I wanted to build a cool robot, but I did not have the money for the full build, so I simulated everything. It also gave me an excuse to write the controls stack and dip my hands into reinforcement learning.',
      stats:[['300 M','training steps, all in simulation'],['98%','success on 5 cm rocks, in simulation']]},
    b:['Designed a 4-layer, 1.6 mm ring-shaped control PCB in KiCad 9 for a five-leg walking robot, with an ESP32 for servo control and a cut-out for a Raspberry Pi 5.',
       'Designed a battery input with reverse-polarity protection, a fuse and TVS diode, a soft-started servo rail with a 1 mOhm shunt and INA180 current sense, and a 5 V buck converter for the Raspberry Pi.',
       'Closed the board\'s electrical checks with 0 ERC errors and 0 warnings, and 0 unconnected pads and 0 footprint errors in DRC.',
       'Designed two half-duplex servo buses at 1 Mbps, each driven by a UART with direction control and level-shifting buffers, to drive 15 bus servos across five legs.',
       'Scripted the robot\'s Fusion 360 CAD in Python across several versions, including legs, chassis, dome, servo mounts and a camera mount for an OAK-D Lite depth camera.',
       'Co-designed the board with the chassis: it sits on the existing deck standoffs at 60.5 mm, with parts kept under a 25 mm height limit.',
       'Trained a five-leg walking policy with PPO in MuJoCo/MJX on an RTX 3060, reaching 0 falls on 7 test commands and 2.0 mm/s forward velocity error after 300 M steps in simulation.',
       'Built a teacher-student pipeline in which a policy that uses a simulated depth-camera height map climbs 2.7 cm and 4.3 cm stairs at 100% and 80% success, against 2% for a blind policy at 2.7 cm.',
       'Trained a blind terrain policy with a curriculum that reaches 98% success on 5 cm rocks in simulation, up from 18% for the flat-ground policy.',
       'Built a MuJoCo model of the 15-servo walker from CAD meshes that stands for 10 s with 0.00 mm drift.',
       'Wrote an error-state Kalman filter that fuses IMU, servo encoder and depth-camera measurements and held 0.02 m position drift over 1.65 m of walking in simulation.']},
   {k:'p-light',t:'LightBox Controller',c:'#4a63c9',ink:'#ffffff',g:'light',cat:['sw'],yr:'2026',tags:'Qt · C++ · OpenCV · TCP',st:'Shipped, open source',link:'https://github.com/PotatoPeaSea/LightboxController',
    desc:{label:'How it works',why:'A Windows desktop app that controls Zengge WiFi smart bulbs directly over the local network, with no cloud. Bulbs are found by UDP broadcast and controlled over raw TCP with 9-byte LEDENET packets. The video pattern engine splits each frame into left and right halves, samples the centre of each region and sends the colours to the bulbs, sorted by depth.',
      stats:[['250+','people at the event it opened'],['5 fps','video colour sampling']]},
    b:['Developed an open-source Qt-based program that lets users orchestrate and control smart bulbs over Wi-Fi.',
       'Lets users map out lights in 3D and assign color patterns from a video.',
       'Continuously improved the software based on the event director\'s needs and vision.',
       'Used to coordinate the opening set for an event with 250+ attendees.']},
   {k:'p-vinyl',t:'Pseudo Vinyl MP3 Player',c:'#ff7a45',ink:'#16131f',g:'vinyl',cat:['hw','sw'],yr:'2026',tags:'ESP32 · FreeRTOS · KiCad · LVGL',st:'In progress',link:'https://github.com/PotatoPeaSea/Pseudo-Vinyl-MP3-Player',
    note:'The v1 prototype board is built and working. Power optimization is the remaining work.',
    b:['Built a battery-powered Bluetooth music player end to end: FreeRTOS firmware, a custom PCB, a 3D-printed enclosure designed in Fusion 360, and a desktop tool that prepares album art for the device.',
       'Wrote C++ FreeRTOS firmware for an ESP32 that decodes MP3s from an SD card with the Helix decoder and streams them over Bluetooth A2DP to wireless earbuds and speakers, with auto-reconnect to the last paired device.',
       'Split the firmware across both cores, with audio decode and the Bluetooth stack on one and the LVGL UI and input handling on the other, joined by a PCM ring buffer, and used the module\'s PSRAM for buffers.',
       'Drove a 240x240 circular GC9A01 display with LVGL to spin the current album art like a vinyl record, with a progress ring, at a 30 Hz refresh rate.',
       'Designed a custom PCB in KiCad with a TP4056 USB-C Li-ion charger, NTC battery-temperature sensing, LDO regulation, status LEDs, a display connector, buttons and a rotary encoder, so the device can run from USB power while charging.',
       'Built a Python desktop tool (CLI and drag-and-drop GUI) that extracts embedded album art from MP3s and converts it to display-ready RGB565 binaries, so the ESP32 never decodes JPEG or PNG.']},
   {k:'p-booth',t:'Selphy Photobooth',c:'#f4d35e',ink:'#2a2100',g:'booth',cat:['hw','sw'],yr:'2026',tags:'Raspberry Pi 5 · CUPS · Next.js · gphoto2',st:'Shipped, still developing',link:'https://github.com/PotatoPeaSea/selphy-photobooth',
    desc:{why:'I built this because I really like photobooths and taking photos with my friends, but public ones are always expensive and commercial solutions cost too much.',
      stats:[['Under $150','in materials'],['~$0.50','per print']],
      ctaLabel:'Hosting an event?',
      cta:'Contact me if you would like to use this at an event you host. I want another reason to keep refining the project and to stress test it.'},
    b:['Built a Linux kiosk photobooth on a Raspberry Pi 5, with Chromium in kiosk mode under systemd, that served 120 parties and produced 200 prints at StormHacks 2026.',
       'Integrated a Canon Rebel SL3 over USB using gphoto2, FFmpeg and a v4l2loopback virtual webcam to feed live view to the kiosk browser, with a Pi Camera fallback.',
       'Configured CUPS with Gutenprint to drive Canon Selphy CP910 and CP1300 dye-sublimation printers, and routed jobs dynamically between two printers to ride out thermal throttling during event queues.',
       'Added reliability handling for a flaky hardware stack: camera recovery after a freeze or drop-out, printer jam detection with guest-facing status, and Wi-Fi setup from kiosk mode.',
       'Disassembled a Selphy printer and probed supply voltages and the MCU-to-motor-controller (ECU) communication on jammed and normal runs to determine whether the jams were electrical.',
       'Read event badges through an NFC reader over PC/SC and logged each tap to the event database.',
       'Printed a QR code on every strip linking to a gallery on a home server over Tailscale Funnel, with a fallback chain (gallery, Vercel Blob, local disk) so a QR code always prints.',
       'Built the Next.js/React touch UI and print renderer and designed the printer and display enclosure in Fusion 360 over 4 printed iterations.']},
   {k:'p-tele',t:'TeleBuddy',c:'#ff4f7b',ink:'#ffffff',g:'tele',cat:['hw','sw'],yr:'2026',tags:'C++ · I2C · PCB design · CAD',st:'Shipped · 1st place',link:'https://devpost.com/software/park-e-rmejf2',
    desc:{why:'The idea was born from burnt fingers and ruined PCBs. At 3 AM at a hackathon, a shaky hand is enough to bridge the pins on a fine-pitch part, and fine motor skills take years to build. We wanted a "ctrl-z for soldering": a system that separates what the human intends from what the robot does.',
      stats:[['1st place','overall at Hack the Coast 2026'],['6-DOF','follower arm mirrors the leader in real time']]},
    b:['★ 1st place overall at UBC Hack the Coast 2026.',
       '★ ScienceTech for Social Good Stream Prize at Hack the Coast 2026.',
       'Engineered two 6-DOF robotic arms capable of real-time teleoperation using rotary encoders and actuators.',
       'Designed a PCB to handle 6 different actuators and 12 encoders over I2C.',
       'Streamed encoder data over UDP to an ESP32 that drives the servos and stepper motors.',
       'Filtered hand tremor out of the controller data with a moving average and a Kalman filter in Python, so a shaky hand gives smooth robot motion.',
       'Developed a 3D soldering simulator using forward kinematics to create a digital twin of the soldering setup.']},
   {k:'p-voice',t:'Voice Agent',c:'#7b6cff',ink:'#ffffff',g:'voice',cat:['sw','ml'],yr:'2026',tags:'TypeScript · Python · Qwen3-TTS · MCP · ACP',st:'In daily use',link:'https://github.com/PotatoPeaSea/voice-agent',
    b:['Built an always-on Discord voice assistant with a streaming speech-to-text, LLM and text-to-speech pipeline that lets me talk to a coding-agent system from a voice channel at any time.',
       'Reached a ~1.1 s round trip from end of speech to first audio out, as measured by the per-turn latency log, by streaming LLM tokens to TTS one sentence at a time and cutting the opening chunk at a clause boundary.',
       'Built barge-in so talking over the bot stops its speech, by aborting one signal that cancels the LLM stream and TTS synthesis and stops the Discord player.',
       'Designed three tiers of voice-model tools (direct lookups, a background quick_agent, agent dispatch), exposing 21 native tools plus allowlisted MCP tools such as web search.',
       'Integrated Claude Code and Hermes agents over the Agent Client Protocol on one shared base class, with follow-ups, per-task model and effort settings, spoken permission prompts, cancellation, and a Discord thread per task with live progress and reports.',
       'Served local Qwen3-TTS with cloned voices from a FastAPI service on an NVIDIA GPU that streams audio in 4-frame chunks (about 0.33 s), serializes GPU work with a lock, and stops generation when the client disconnects.',
       'Kept replies audible when the local TTS service fails, as measured by 4 failover tests, by switching to a fallback voice after a 5 s first-audio timeout.',
       'Kept voice replies flowing during slow lookups, as measured by 5 background-job tests, by moving calls that outlast a 3 s default wait to the background and speaking their results later.',
       'Let agent tasks survive restarts of the voice agent by writing the task registry atomically and resuming follow-ups through ACP session/resume.',
       'Kept file lookups and task dispatch inside allowed project folders by resolving paths through symlinks and refusing credential files by name.',
       'Designed pluggable speech and LLM provider interfaces supporting OpenAI-compatible APIs, so models and voices can be swapped without code changes.']},
   {k:'p-arducam',t:'ArduCAM Bakeout Test UI',c:'#b388ff',ink:'#1d0b3a',g:'cam',cat:['sw','hw'],yr:'2026',tags:'Qt · C++ · QML · Serial · ArduCAM',st:'Open source',link:'https://github.com/PotatoPeaSea/Payload-Arducam-Bakeout-Test-Automation-UI',
    b:['Built a Qt desktop app (C++ and QML) that controls an ArduCAM module over a serial port, with a live preview, manual and automatic exposure, resolution switching and single-shot capture.',
       'Wrote a controller that queues hexadecimal commands to the camera and splits the incoming serial stream into text logs and raw JPEG bursts, then decodes the frames for the live view.',
       'Automated pre- and post-bakeout image testing with a guided wizard: 24 angles in 15 degree steps and 5 images at 2592x1944 each, so 120 images per run.',
       'Calibrates exposure automatically with a binary search on the average grayscale brightness until it reaches the target of 160, plus or minus 5.']},
   {k:'p-eco',t:'EcoDepot',c:'#8bd450',ink:'#12290a',g:'eco',cat:['hw','ml'],yr:'2025',tags:'Python · Stepper motors · Serial',st:'Shipped · Award',link:'https://devpost.com/software/ecodepot',
    b:['★ Surge Choice Award at SFU StormHacks 2025.',
       'Built a trash can that automatically sorts recyclables and gives users refunds.',
       'Developed firmware for stepper-motor control and serial communication with a Python backend.',
       'Organized tasks for a team of 4 based on strengths and specified high-level system design requirements.']}
  ];
  /* Hidden for now: move an entry back into P to show it again. */
  var HIDDEN=[
   {k:'p-llm',t:'LLM-Deployment',c:'#33b5e5',ink:'#04202b',g:'chip',cat:['sw','ml'],yr:'2026',tags:'Qualcomm NPU · QNN Genie · llama.cpp · React Native · Kotlin',st:'Working prototype',link:'https://github.com/PotatoPeaSea/LLM-Deployment',
    b:['Built an on-device chat app that runs five LLMs (Llama 3.2 1B and 3B, Qwen3 4B, Qwen3.5 2B, Gemma 4 E2B) on the Hexagon NPU of a Qualcomm QCS8550 board, on Android and on Ubuntu.',
       'Brought up two NPU runtimes on one chip: QNN Genie context binaries behind a JNI bridge that keeps the KV cache between turns so each turn prefills only the new text, and GGUF models through GenieX (llama.cpp).',
       'Measured Qwen3.5 2B on the Ubuntu target with llama-bench: decode ran at 21.6 tok/s on the CPU against 7.0 tok/s on the Hexagon backend, while prefill was faster on the Hexagon (164.5 vs 101.5 tok/s), so the CPU is the default.',
       'Fixed unreliable in-process model switching on Android by restarting the process, which reached 60 of 60 switches without a reboot in stress runs.',
       'Enforced the context budget in the app because Genie silently truncates over-long prompts, and found that Qwen3 4B loads on this chip only at a 512-token context.',
       'Added tool calling for Qwen3.5 2B (date and time, battery, device info, web search) with a tolerant parser and a four-iteration cap on Android, and structured tool calls through llama-server on Ubuntu.',
       'Built one React Native UI for both targets, with persisted chats, streamed replies and per-chat brevity and reasoning toggles, plus a Node app-server that serves it in a browser on the board.',
       'Worked around board packaging issues, such as copying model files off FUSE-backed storage because the DSP cannot map them.']},
   {k:'p-flux',t:'Virtual Flux',c:'#ff9f43',ink:'#2a1500',g:'iron',cat:['hw','sw'],yr:'2026',tags:'Unity · C# · KiCad · PlatformIO · 6-DOF arm',st:'In progress',link:'https://github.com/PotatoPeaSea/6dof',
    note:'The simulator runs with keyboard and mouse input. The 6-DOF arm firmware is still in progress.',
    b:['Built Virtual Flux, a hand-soldering simulator in Unity 6 where a virtual PCB reacts to the pose and tip temperature of a soldering iron, designed to be driven by a physical 6-DOF arm.',
       'Wrote a deterministic grid-based simulation at a fixed 5 ms timestep: a thermal model, a flux state machine (cold, active, burnt), solder flow with wetting, and a bonding state machine that joins a pin only after molten solder cools and solidifies.',
       'Parsed real RS-274X Gerber files to generate the virtual copper PCB meshes.',
       'Scored each joint against tolerances for soldering angle, dwell time, peak temperature, flux sequence and solder volume, with a step-by-step checklist on screen.',
       'Designed two custom KiCad boards for the arm, an MCU board and a controller board, and specified the serial protocol that streams tool-tip pose and temperature to the PC.',
       'Covered the thermal and flux models, solder flow, Gerber parser, serial parser and scorer with EditMode unit tests.']}
  ];
  var M=[
   {k:'m-1',set:'hack',t:'Hackathons',c:'#f4d35e',ink:'#2a2100',g:'booth',blurb:'Build weekends, demos and expo halls, from StormHacks to Cal Hacks.'},
   {k:'m-2',set:'lab',t:'In the lab',c:'#ff7a45',ink:'#16131f',g:'light',blurb:'Workbenches, scopes, dev boards and a few teardowns.'},
   {k:'m-3',set:'friends',t:'Friends & travel',c:'#4fd1c5',ink:'#0b2a27',g:'plus',blurb:'Trips, hikes, late dinners and the people I do all of this with.'}
  ];
  var X=[
   {t:'Field Application Engineer, Embedded Systems',org:'Quectel Vancouver R&D Centre · Richmond, BC · Co-op',when:'Apr 2026 – Dec 2026',tag:'Current',chips:['Yocto','Qualcomm SNPE','MIPI DSI','Bluetooth','V4L2','Linux kernel'],
    b:['Quantized CNN vision models using a custom calibration dataset to minimize accuracy loss and deployed them with Qualcomm SNPE on the SoC\'s DSP, raising FPS 7x over the CPU/GPU baseline.',
       'Root-caused a camera that stopped working after a firmware update, using firmware A/B testing, then hardware connectivity checks, oscilloscope timing and clock analysis, and module A/B swaps, alongside UART debug logs, dmesg and adb logcat.',
       'Developed a cross-compiled C++ CLI that exposes low-level Bluetooth functions (GATT servers, L2CAP, HCI) in one binary so customers can test their hardware.',
       'Delivered test programs and SDK patches to customers through a ticketing system, including display and camera drivers and MIPI C-PHY compatibility patches.',
       'Modified XBL bootloader configurations to bring up MIPI DSI displays at boot.',
       'Modified Yocto recipes to configure specific custom Linux/Android builds (BitBake, CMake, arm-gcc) and set up cross-compilation toolchains for customer requirements and testing.',
       'Added support for Linux kernel drivers on the platform\'s hardware.',
       'Worked with V4L2 in user space to interface with camera devices.',
       'Debugged PMIC brownout and fuel gauge issues.']},
   {t:'Payload Firmware Lead',org:'ALEASAT Project, SFU Satellite · Vancouver, BC',when:'Jan 2026 – present',tag:'Current',chips:['C / C++','TMS570','FreeRTOS','LittleFS','GitLab CI','HIL testing'],
    b:['Led payload (camera) firmware for the SFU satellite and reviewed all payload-subsystem pull requests in GitLab before merge.',
       'Developed and debugged C/C++ firmware on the ARM-based TMS570 MCU in Code Composer Studio, using breakpoints and JTAG to trace control flow through the camera functions.',
       'Implemented FreeRTOS camera driver functions and interfaces to adjust camera parameters such as exposure and resolution, using DMA and mutexes and semaphores to arbitrate shared resources between tasks.',
       'Implemented image capture with LittleFS to store pixel data and image metadata in SPI flash memory.',
       'Validated firmware through GitLab CI/CD pipelines that run hardware-in-the-loop (HIL) tests.',
       'Developed a Qt/C++ desktop application to interface with an ArduCam via SPI and I2C.',
       'Integrated the camera module into the FlatSat, ensuring hardware verification and end-to-end image capture.']},
   {t:'Computer Vision Engineer',org:'SFU Ascension Robotics Design Team · Surrey, BC',when:'Sep 2025 – Apr 2026',tag:'',chips:['OpenCV','Image segmentation','Kalman filter'],
    b:['Implemented hue- and saturation-based color-filtering algorithms for object segmentation and preprocessing.',
       'Implemented dilation and erosion to improve object segmentation by 10%.',
       'Preprocessed and prepared data to improve Kalman filter performance.']}
  ];
  var SK=[
   ['Languages',['C','C++','Python','Java']],
   ['Technologies',['Microcontrollers','Embedded Linux','FreeRTOS','Yocto','CMake','GCC','Git','GitLab CI/CD','HIL Testing','JTAG','Code Composer Studio','DMA','SPI','I2S','I2C','UART','TCP','UDP','Bluetooth','Android','Qualcomm SNPE','OpenCV','Qt','KiCad','Oscilloscopes','Logic Analyzers']],
   ['Concepts',['Embedded Systems','RTOS','Firmware','Device Drivers','Bootloaders','Code Review','Root Cause Analysis','Model Quantization','PCB Design','PID Control','CAD','Computer Vision','Data Analysis','Machine Learning','Forward Kinematics']]
  ];

  /* ---------- glyphs for placeholder art ---------- */
  var GL={
   vinyl:'<circle cx="50" cy="50" r="34" fill="currentColor" opacity=".18"/><circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="currentColor"/>',
   rocky:'<g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"><path d="M50 50V12"/><path d="M50 50L86 38"/><path d="M50 50L72 82"/><path d="M50 50L28 82"/><path d="M50 50L14 38"/></g><circle cx="50" cy="50" r="11" fill="currentColor"/>',
   booth:'<g fill="currentColor"><rect x="34" y="8" width="32" height="24"/><rect x="34" y="36" width="32" height="24"/><rect x="34" y="64" width="32" height="24" opacity=".5"/></g>',
   voice:'<g fill="currentColor"><rect x="10" y="38" width="9" height="24"/><rect x="24" y="24" width="9" height="52"/><rect x="38" y="10" width="9" height="80"/><rect x="52" y="28" width="9" height="44"/><rect x="66" y="16" width="9" height="68"/><rect x="80" y="36" width="9" height="28"/></g>',
   tele:'<g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"><path d="M16 84L36 34L52 58"/><path d="M84 84L64 34L48 58"/></g><circle cx="16" cy="84" r="6" fill="currentColor"/><circle cx="84" cy="84" r="6" fill="currentColor"/>',
   light:'<g fill="currentColor"><circle cx="20" cy="22" r="9"/><circle cx="46" cy="22" r="9" opacity=".5"/><circle cx="72" cy="22" r="9"/><circle cx="20" cy="50" r="9" opacity=".5"/><circle cx="46" cy="50" r="9"/><circle cx="72" cy="50" r="9" opacity=".5"/><circle cx="20" cy="78" r="9"/><circle cx="46" cy="78" r="9" opacity=".5"/><circle cx="72" cy="78" r="9"/></g>',
   eco:'<g fill="currentColor"><rect x="26" y="30" width="48" height="56" rx="3"/><rect x="20" y="18" width="60" height="9" rx="2" opacity=".6"/><rect x="40" y="10" width="20" height="7" rx="2" opacity=".6"/></g>',
   plus:'<g fill="currentColor"><rect x="43" y="16" width="14" height="68"/><rect x="16" y="43" width="68" height="14"/></g>',
   chip:'<g fill="currentColor"><rect x="28" y="28" width="44" height="44" rx="3"/><g opacity=".6"><rect x="36" y="14" width="6" height="12"/><rect x="47" y="14" width="6" height="12"/><rect x="58" y="14" width="6" height="12"/><rect x="36" y="74" width="6" height="12"/><rect x="47" y="74" width="6" height="12"/><rect x="58" y="74" width="6" height="12"/><rect x="14" y="36" width="12" height="6"/><rect x="14" y="47" width="12" height="6"/><rect x="14" y="58" width="12" height="6"/><rect x="74" y="36" width="12" height="6"/><rect x="74" y="47" width="12" height="6"/><rect x="74" y="58" width="12" height="6"/></g></g>',
   iron:'<g stroke="currentColor" stroke-width="7" stroke-linecap="round" fill="none"><path d="M18 82L58 42"/><path d="M58 42L70 30" stroke-width="12"/></g><circle cx="80" cy="20" r="8" fill="currentColor" opacity=".7"/><rect x="14" y="86" width="72" height="6" fill="currentColor" opacity=".5"/>',
   cam:'<g fill="currentColor"><rect x="14" y="30" width="72" height="48" rx="6"/><rect x="36" y="20" width="28" height="12" opacity=".6"/></g><circle cx="50" cy="54" r="15" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="6"/>'
  };
  function glyph(g){return '<svg viewBox="0 0 100 100" aria-hidden="true">'+GL[g]+'</svg>';}

  /* ---------- textures drawn in code ---------- */
  var seed=11; function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
  function pick(a){return a[(rnd()*a.length)|0];}
  function mk(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return 'url('+c.toDataURL()+')';}
  var T={};
  T.side=mk(16,16,function(c){
    var fr=['#8c5b3d','#845438','#946141'];
    for(var y=0;y<16;y++)for(var x=0;x<16;x++){c.fillStyle=pick(fr);c.fillRect(x,y,1,1);}
    c.fillStyle='#5a3523';c.fillRect(0,0,16,1);c.fillRect(0,15,16,1);c.fillRect(0,0,1,16);c.fillRect(15,0,1,16);
    for(var y2=2;y2<=13;y2++)for(var x2=2;x2<=13;x2++){
      var col;
      if(x2===2||y2===2) col='#35200f';
      else if(x2===13||y2===13) col='#a6714c';
      else{var u=(x2+y2)%4, v=(((x2-y2)%4)+4)%4; col=(u===0||v===0)?'#3a2216':((u===2&&v===2)?'#9a6444':pick(['#7a4a31','#744630']));}
      c.fillStyle=col;c.fillRect(x2,y2,1,1);
    }
  });
  T.top=mk(16,16,function(c){
    var fr=['#9a6646','#935f40','#a06c4a'];
    for(var y=0;y<16;y++)for(var x=0;x<16;x++){c.fillStyle=pick(fr);c.fillRect(x,y,1,1);}
    c.fillStyle='#5a3523';c.fillRect(0,0,16,1);c.fillRect(0,15,16,1);c.fillRect(0,0,1,16);c.fillRect(15,0,1,16);
    c.fillStyle='#b98059';c.fillRect(1,1,14,1);c.fillRect(1,1,1,14);
    c.fillStyle='#6d4229';c.fillRect(2,14,13,1);c.fillRect(14,2,1,13);
    for(var y3=3;y3<=12;y3++)for(var x3=3;x3<=12;x3++){c.fillStyle=(y3%3===0&&rnd()<.55)?'#80502f':pick(['#905e3f','#8b5a3b']);c.fillRect(x3,y3,1,1);}
    c.fillStyle='#4a2a1a';c.fillRect(4,6,8,1);c.fillStyle='#0f0b08';c.fillRect(4,7,8,2);c.fillStyle='#6e4430';c.fillRect(4,9,8,1);
  });
  T.grass=mk(16,16,function(c){
    var dirt=['#8a5a36','#7d4f2d','#966440'],g=['#62a640','#58983a','#6bb046'];
    for(var y=0;y<16;y++)for(var x=0;x<16;x++){c.fillStyle=pick(dirt);c.fillRect(x,y,1,1);}
    for(var x2=0;x2<16;x2++){var h=3+((rnd()*3)|0);for(var y2=0;y2<h;y2++){c.fillStyle=pick(g);c.fillRect(x2,y2,1,1);}}
    c.fillStyle='#5e3c20';for(var i=0;i<10;i++)c.fillRect((rnd()*16)|0,6+((rnd()*10)|0),1,1);
  });
  T.dirt=mk(16,16,function(c){
    var dirt=['#8a5a36','#7d4f2d','#966440'];
    for(var y=0;y<16;y++)for(var x=0;x<16;x++){c.fillStyle=pick(dirt);c.fillRect(x,y,1,1);}
    c.fillStyle='#5e3c20';for(var i=0;i<16;i++)c.fillRect((rnd()*16)|0,(rnd()*16)|0,1,1);
    c.fillStyle='#a8774d';for(var j=0;j<8;j++)c.fillRect((rnd()*16)|0,(rnd()*16)|0,1,1);
  });
  T.cloud=mk(24,8,function(c){c.fillStyle='#fff';[[6,0,12],[3,1,18],[1,2,22],[0,3,24],[1,4,22],[3,5,18]].forEach(function(r){c.fillRect(r[0],r[1],r[2],1);});});
  var discCache={};
  function discBody(col){
    if(discCache[col])return discCache[col];
    return discCache[col]=mk(32,32,function(c){
      for(var y=0;y<32;y++)for(var x=0;x<32;x++){
        var dx=x-15.5,dy=y-15.5,d=Math.sqrt(dx*dx+dy*dy);
        if(d>15.6)continue;
        var f='#121212';
        if(d>=13&&d<14)f='#1d1d1d'; if(d>=11&&d<12)f='#1a1a1a';
        if(d<=10.4)f=col;
        else if(dx<0&&dy<0&&d>=12.5&&d<13&&((x+y)%3===0))f='#3a3a3a';
        c.fillStyle=f;c.fillRect(x,y,1,1);
      }
    });
  }
  var noteCache={};
  function noteTex(h){
    h=Math.round(h/30)*30; if(noteCache[h])return noteCache[h];
    var rows=['...XX.','...X.X','...X..','...X..','.XXX..','XXXX..','.XX...'],col='hsl('+h+',95%,62%)';
    return noteCache[h]=mk(6,7,function(c){c.fillStyle=col;rows.forEach(function(r,y){for(var x=0;x<r.length;x++)if(r[x]==='X')c.fillRect(x,y,1,1);});});
  }
  M.forEach(function(m){m.body=discBody(m.c);});

  function bg(sel,tex){Array.prototype.forEach.call(document.querySelectorAll(sel),function(e){e.style.backgroundImage=tex;});}
  bg('.cube .fl',T.side);bg('.cube .fr',T.side);bg('.cube .ft',T.top);
  bg('.grass',T.grass);bg('.dirt',T.dirt);bg('.cloud',T.cloud);
  $('.grass').style.backgroundSize='22px 22px';$('.dirt').style.backgroundSize='22px 22px';
  $('#brandico').style.backgroundImage=discBody('#7be06a');
  var st='';for(var si=0;si<34;si++){st+='<i'+(si%5===0?' class="tw"':'')+' style="left:'+(rnd()*100).toFixed(1)+'%;top:'+(rnd()*55).toFixed(1)+'%;animation-delay:'+(rnd()*3).toFixed(1)+'s"></i>';}
  $('#stars').innerHTML=st;

  /* ---------- media: covers and galleries come from data/media.js ---------- */
  var MEDIA=window.PORTFOLIO_MEDIA||{covers:{},gallery:{}};
  function imgSrc(k){return MEDIA.covers[k]||null;}

  /* ---------- hero jukebox ---------- */
  var tray=$('#tray'), cap=$('#cap'), jb=$('#jb'), scene=$('#scene'), cur=null, sel=0, busy=false, noteTimer=null, show=$('#show'), showTimer=null, slide=0, win=$('#win'), heroWrap=$('#herowrap'), heroTxt=$('#herotxt'), dropped=false;
  var LIFE=MEDIA.life||{};
  function discHTML(m){
    var src=imgSrc(m.k);
    return '<span class="disc" style="background-image:'+m.body+';--c:'+m.c+';--ink:'+m.ink+'"><span class="art">'+(src?'<img src="'+src+'" alt="">':glyph(m.g))+'</span></span>';
  }
  function renderTray(){
    tray.innerHTML=M.map(function(m,i){
      return '<button class="dk'+(i===sel?' sel':'')+(i===cur?' empty':'')+'" data-i="'+i+'" type="button" aria-pressed="'+(i===cur)+'" aria-label="Disc: '+esc(m.t)+'">'+discHTML(m)+'<span class="dl">'+esc(m.t)+'</span></button>';
    }).join('');
  }
  function renderCap(){
    var m=M[sel];
    cap.innerHTML='<div class="np">'+(cur===sel?'Now playing':'Disc '+(sel+1)+' of '+M.length)+'</div><h3>'+esc(m.t)+'</h3><p>'+esc(m.blurb)+'</p>';
  }
  function notes(on){
    clearInterval(noteTimer); noteTimer=null;
    if(!on||reduce)return;
    function spawn(){
      var rr=scene.getBoundingClientRect(), jr=jb.getBoundingClientRect(), n=document.createElement('i');
      n.className='note'; n.style.backgroundImage=noteTex(Math.random()*360);
      n.style.left=(jr.left-rr.left+jr.width/2-7+(Math.random()*40-20))+'px';
      n.style.top=(jr.top-rr.top+jr.height/2-56)+'px';
      n.style.setProperty('--dx',(Math.random()*44-22)+'px');
      scene.appendChild(n); setTimeout(function(){if(n.parentNode)n.parentNode.removeChild(n);},2000);
    }
    spawn(); noteTimer=setInterval(spawn,450);
  }
  function renderShow(){
    var set=cur===null?M[sel].set:M[cur].set, s=LIFE[set]&&LIFE[set].length?LIFE[set]:[{}];
    show.innerHTML='<div class="sl">'+s.map(function(p,i){
      var bg=p.type==='video'?'':' style="--bg:url(\''+p.src+'\')"';
      var media=!p.src?'<div class="soon">Photos coming soon</div>':p.type==='video'?'<video src="'+p.src+'" muted loop playsinline preload="metadata"></video>':'<img src="'+p.src+'" alt="'+esc(p.cap||'')+'" loading="lazy">';
      return '<figure class="'+(i===slide?'on':'')+(p.type==='video'?' vid':'')+'"'+bg+'>'+media+(p.cap?'<figcaption>'+esc(p.cap)+'</figcaption>':'')+'</figure>';
    }).join('')+'</div>'+(s.length>1?'<div class="dots">'+s.map(function(p,i){return '<i class="'+(i===slide?'on':'')+'"></i>';}).join('')+'</div>':'');
    playVid();
  }
  function playVid(){
    Array.prototype.forEach.call(show.querySelectorAll('figure'),function(f){
      var v=f.querySelector('video'); if(!v)return;
      if(f.classList.contains('on')){v.currentTime=0;var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});}else v.pause();
    });
  }
  function count(){return (LIFE[M[cur===null?sel:cur].set]||[]).length;}
  function queue(){
    clearTimeout(showTimer); showTimer=null;
    if(count()<2)return;
    var f=show.querySelectorAll('figure')[slide];
    showTimer=setTimeout(step,f&&f.classList.contains('vid')?6500:3800);
  }
  function step(){
    slide=(slide+1)%count();
    Array.prototype.forEach.call(show.querySelectorAll('figure'),function(f,i){f.classList.toggle('on',i===slide);});
    Array.prototype.forEach.call(show.querySelectorAll('.dots i'),function(d,i){d.classList.toggle('on',i===slide);});
    playVid(); queue();
  }
  function flip(node,from){
    if(reduce||!node.animate)return;
    var to=node.getBoundingClientRect();
    if(!to.width||!to.height)return;
    node.animate([{transformOrigin:'0 0',transform:'translate('+(from.left-to.left)+'px,'+(from.top-to.top)+'px) scale('+(from.width/to.width)+','+(from.height/to.height)+')'},{transformOrigin:'0 0',transform:'none'}],{duration:700,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  /* drop the window below the title and widen it, or put it back in the hero */
  function drop(on){
    if(dropped===on)return; dropped=on;
    var w0=win.getBoundingClientRect(), t0=heroTxt.getBoundingClientRect();
    heroWrap.classList.toggle('dropped',on); win.classList.toggle('wide',on);
    flip(win,w0); flip(heroTxt,t0);
    if(on)setTimeout(function(){var r=win.getBoundingClientRect();if(r.bottom>window.innerHeight||r.top<64)win.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});},reduce?0:760);
  }
  function showOn(on){
    clearTimeout(showTimer); showTimer=null;
    scene.classList.toggle('split',on);
    show.setAttribute('aria-hidden',on?'false':'true');
    drop(on);
    if(on){slide=0;renderShow();queue();}
    else Array.prototype.forEach.call(show.querySelectorAll('video'),function(v){v.pause();});
  }
  function eject(){if(cur===null)return;cur=null;notes(false);showOn(false);renderTray();renderCap();}
  function fly(node,cb){
    var from=node.getBoundingClientRect(), jr=jb.getBoundingClientRect(), f=node.cloneNode(true);
    f.className='disc fly'; f.style.cssText+=';left:'+from.left+'px;top:'+from.top+'px;width:'+from.width+'px;height:'+from.height+'px';
    document.body.appendChild(f);
    var dx=jr.left+jr.width/2-(from.left+from.width/2), dy=jr.top+jr.height/2-42-(from.top+from.height/2);
    void f.offsetWidth;
    f.style.transform='translate('+dx+'px,'+dy+'px) scale(.45) rotate(300deg)';
    setTimeout(function(){if(f.parentNode)f.parentNode.removeChild(f);cb();},520);
  }
  function done(i){
    cur=i; busy=false; renderTray(); renderCap(); notes(true); show.classList.remove('swap'); slide=0; scene.classList.add('split'); dropped?(renderShow(),queue(),show.setAttribute('aria-hidden','false')):showOn(true);
    jb.classList.remove('hit'); void jb.offsetWidth; jb.classList.add('hit');
  }
  function play(i,quiet){
    if(busy)return;
    if(cur===i){eject();return;}
    var keep=dropped; cur=null; notes(false); if(!keep)showOn(false); else{clearTimeout(showTimer);show.classList.add('swap');} sel=i; renderTray(); renderCap();
    var btn=tray.children[i], disc=btn&&btn.querySelector('.disc');
    if(quiet||reduce||!disc){done(i);return;}
    busy=true; fly(disc,function(){done(i);});
    btn.classList.add('empty'); btn.classList.add('sel');
    Array.prototype.forEach.call(tray.children,function(b,k){if(k!==i)b.classList.remove('sel');});
  }
  tray.addEventListener('click',function(e){var b=e.target.closest('.dk');if(b)play(parseInt(b.dataset.i,10));});
  jb.addEventListener('click',eject);

  /* ---------- discography ---------- */
  var chipsEl=$('#chips'), cardsEl=$('#cards'), albumEl=$('#album'), listEl=$('#listview'), showBtn=$('#showall');
  var FILT=[['all','Popular'],['hw','Hardware'],['sw','Software'],['ml','ML']], filt='all', showAll=false, openIdx=null;
  function hl(t){return esc(t).replace(/(\b\d[\d.,]*(?:\s?(?:x|%|Hz|mm\/s|mm|cm|Mbps|ms|s|M|\+))?)(?![\w])/g,'<b>$1</b>');}
  function coverInner(p){
    var s=imgSrc(p.k);
    return s?'<img src="'+s+'" alt="'+esc(p.t)+' cover" loading="lazy">':'<span class="ph" style="--c:'+p.c+';--ink:'+p.ink+'">'+glyph(p.g)+'</span>';
  }
  function visible(){return P.filter(function(p){return filt==='all'||p.cat.indexOf(filt)>-1;});}
  function renderChips(){
    chipsEl.innerHTML=FILT.map(function(f){return '<button type="button" data-f="'+f[0]+'" aria-pressed="'+(f[0]===filt)+'">'+f[1]+'</button>';}).join('');
  }
  function renderCards(){
    var list=visible(), shown=showAll?list:list.slice(0,4);
    cardsEl.innerHTML=shown.map(function(p){
      var i=P.indexOf(p);
      return '<article class="card"><button class="cvbtn" type="button" data-i="'+i+'" aria-label="Open '+esc(p.t)+'"><span class="cv">'+coverInner(p)+'<span class="play" aria-hidden="true">▶</span></span></button>'+
        '<h3 class="ct">'+esc(p.t)+'</h3><p class="cm">'+p.yr+' • '+esc(p.st)+'</p></article>';
    }).join('');
    showBtn.hidden=list.length<=4; showBtn.textContent=showAll?'Show less':'Show all';
  }
  function bullets(p){
    return p.b.map(function(t,k){
      var ch=t.indexOf('★ ')===0; if(ch)t=t.slice(2);
      var kind=ch?'chal':(/\d/.test(t)?'goal':'task');
      return '<li style="animation-delay:'+(reduce?0:k*35)+'ms"><span class="fi '+kind+'"><i class="px" style="background-image:'+discBody(p.c)+'"></i></span><span>'+hl(t)+'</span></li>';
    }).join('');
  }
  function renderAlbum(){
    var p=P[openIdx], prev=P[(openIdx+P.length-1)%P.length], next=P[(openIdx+1)%P.length];
    albumEl.innerHTML=
      '<button class="back" type="button" id="back">← All projects</button>'+
      '<div class="ah"><div class="acv"><span class="cv">'+coverInner(p)+'</span>'+'</div>'+
      '<div><span class="eyebrow">Project · '+p.yr+'</span><h3>'+esc(p.t)+'</h3><div class="tags">'+esc(p.tags)+'</div><span class="pill">'+esc(p.st)+'</span>'+
      descHTML(p)+(p.note?'<div class="note2">'+esc(p.note)+'</div>':'')+
      '<div class="acta"><a class="btn" href="'+p.link+'" target="_blank" rel="noopener">View project ↗</a></div></div></div>'+
      galleryHTML(p)+'<div class="advbox"><div class="ttl"><span>Advancements</span><small>'+p.b.length+' for this project</small></div><ul class="advlist">'+bullets(p)+'</ul>'+
      '<div class="pn"><button type="button" id="prev">← '+esc(prev.t)+'</button><button type="button" id="next">'+esc(next.t)+' →</button></div></div>';
    var ci=$('#capin',albumEl); if(ci){ci.focus();ci.setSelectionRange(ci.value.length,ci.value.length);}
  }

  function descHTML(p){
    var d=p.desc; if(!d)return '';
    return '<div class="desc"><div class="dwhy"><span class="dlab">'+esc(d.label||'Why I built it')+'</span><p>'+esc(d.why)+'</p></div>'+
      (d.stats?'<div class="dstats">'+d.stats.map(function(s){return '<div class="dstat"><b>'+esc(s[0])+'</b><span>'+esc(s[1])+'</span></div>';}).join('')+'</div>':'')+
      (d.cta?'<div class="dcta"><div><span class="dlab">'+esc(d.ctaLabel)+'</span><p>'+esc(d.cta)+'</p></div><a class="btn" href="#contact">Contact me</a></div>':'')+'</div>';
  }

  /* ---------- project gallery ---------- */
  var gal=MEDIA.gallery;
  function galItems(k){return gal[k]||[];}
  function tileHTML(it,n){
    var media;
    if(it.type==='video')media='<span class="gimg"><video src="'+it.src+'#t=0.1" preload="metadata" muted playsinline></video><span class="gbadge" aria-hidden="true">\u25b6</span></span>';
    else media='<span class="gimg"><img src="'+it.src+'" alt="'+esc(it.cap||'Project photo')+'" loading="lazy"></span>';
    return '<div class="gt"><button class="gopen" type="button" data-n="'+n+'" aria-label="View '+esc(it.cap||'media item')+'">'+media+'</button>'+(it.cap?'<p class="gcp">'+esc(it.cap)+'</p>':'')+'</div>';
  }
  function galleryHTML(p){
    var items=galItems(p.k); if(!items.length)return '';
    return '<div class="gal"><div class="gh"><h4>Gallery</h4><span class="gn">'+items.length+(items.length>1?' items':' item')+'</span></div><div class="ggrid">'+items.map(tileHTML).join('')+'</div></div>';
  }
  albumEl.addEventListener('click',function(e){
    var b=e.target.closest('button.gopen'); if(b)openLb(parseInt(b.dataset.n,10));
  });

  /* lightbox */
  var lb=$('#lb'), lbItems=[], lbN=0, lbOpener=null;
  function showLb(){
    var it=lbItems[lbN];
    $('.lbm',lb).innerHTML=it.type==='video'?'<video src="'+it.src+'" controls playsinline></video>':'<img src="'+it.src+'" alt="'+esc(it.cap||'Project photo')+'">';
    $('.lbc',lb).textContent=(it.cap||'')+(lbItems.length>1?(it.cap?'  \u00b7  ':'')+(lbN+1)+' / '+lbItems.length:'');
    var multi=lbItems.length>1; $('.lbp',lb).hidden=!multi; $('.lbn',lb).hidden=!multi;
  }
  function openLb(n){
    lbItems=galItems(P[openIdx].k); if(!lbItems.length)return;
    lbN=n; lbOpener=document.activeElement; showLb(); lb.hidden=false; $('.lbx',lb).focus();
  }
  function closeLb(){lb.hidden=true;$('.lbm',lb).innerHTML='';if(lbOpener&&lbOpener.focus)lbOpener.focus();}
  function stepLb(d){if(lbItems.length<2)return;lbN=(lbN+d+lbItems.length)%lbItems.length;showLb();}
  lb.addEventListener('click',function(e){
    if(e.target===lb||e.target.closest('.lbx'))closeLb();
    else if(e.target.closest('.lbp'))stepLb(-1);
    else if(e.target.closest('.lbn'))stepLb(1);
  });
  document.addEventListener('keydown',function(e){
    if(lb.hidden)return;
    if(e.key==='Escape')closeLb(); else if(e.key==='ArrowLeft')stepLb(-1); else if(e.key==='ArrowRight')stepLb(1);
  });

  function openAlbum(i){
    openIdx=i; listEl.hidden=true; albumEl.hidden=false; renderAlbum();
    $('#projects').scrollIntoView({block:'start'});
  }
  function closeAlbum(){openIdx=null; albumEl.hidden=true; listEl.hidden=false; $('#projects').scrollIntoView({block:'start'});}
  chipsEl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filt=b.dataset.f;showAll=false;renderChips();renderCards();});
  showBtn.addEventListener('click',function(){showAll=!showAll;renderCards();});
  cardsEl.addEventListener('click',function(e){
    var b=e.target.closest('.cvbtn'); if(b)openAlbum(parseInt(b.dataset.i,10));
  });
  albumEl.addEventListener('click',function(e){
    if(e.target.closest('#back'))closeAlbum();
    else if(e.target.closest('#prev')){openIdx=(openIdx+P.length-1)%P.length;renderAlbum();}
    else if(e.target.closest('#next')){openIdx=(openIdx+1)%P.length;renderAlbum();}
  });


  /* ---------- experience, skills, contact ---------- */
  $('#tl').innerHTML=X.map(function(j,k){
    var show=4, extra=j.b.length>show?j.b.length-show:0;
    var li=j.b.map(function(t,n){return '<li'+(n>=show?' class="more"':'')+'>'+hl(t)+'</li>';}).join('');
    return '<article class="job"><div class="when"><b>'+(j.tag||'')+'</b>'+esc(j.when)+'</div><div><h3>'+esc(j.t)+'</h3><p class="org">'+esc(j.org)+'</p>'+
      '<div class="chips">'+j.chips.map(function(c){return '<span class="chip">'+esc(c)+'</span>';}).join('')+'</div>'+
      '<ul class="bul" id="bul'+k+'">'+li+'</ul>'+
      (extra?'<button class="tgl" type="button" data-t="bul'+k+'" data-n="'+extra+'" aria-expanded="false">Show '+extra+' more</button>':'')+'</div></article>';
  }).join('');
  $('#tl').addEventListener('click',function(e){
    var b=e.target.closest('.tgl'); if(!b)return;
    var ul=document.getElementById(b.dataset.t), open=ul.classList.toggle('open');
    b.setAttribute('aria-expanded',open?'true':'false'); b.textContent=open?'Show fewer':'Show '+b.dataset.n+' more';
  });
  $('#sk').innerHTML=SK.map(function(g){return '<div><h3>'+g[0]+'</h3><div class="chips">'+g[1].map(function(c){return '<span class="chip">'+esc(c)+'</span>';}).join('')+'</div></div>';}).join('');
  $('#copy').addEventListener('click',function(){
    var el=$('#email'), out=$('#copied');
    function fallback(){var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);out.textContent='Press copy to finish';}
    try{navigator.clipboard.writeText(el.textContent).then(function(){out.textContent='Copied';},fallback);}catch(err){fallback();}
  });

  /* ---------- start ---------- */
  renderChips(); renderCards(); renderTray(); renderCap();
  renderTray();renderCap();
})();
