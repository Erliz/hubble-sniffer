# Application to connect with [Hubble](https://app.hubbleconnected.com/)

Testing on [Motorola MBP853 CONNECT](http://www.motorolahome.com/mbp854connect.html)

## Camera ports
```
Open TCP Port: 	80     		http
Open TCP Port: 	6667   		rtsp
Open TCP Port: 	8080   		http-proxy
Open TCP Port: 	51108  		sound input
Open TCP Port: 	60000
Open TCP Port: 	60001
```

### Actions
use: `/?action=command`
```
snapshot
log
device_status
mini_device_status
stream
appletvastream
appletvstream
appletastream
command
```

### Commands
use: `/?action=command&command=recording_cooloff_duration&value=60`
#### Getters
```
get_mac_address

# not checked
get_audio_finetune
get_codecs_support
get_debug_val1
get_default_version
get_hw_version
get_log
get_mac_in_flash
get_mac_address
get_register
get_routers_list
get_sensor_register
get_sessionkey
get_session_key
get_spk_volume
get_storage_folder
get_temp_offset
get_upnp_port
get_version
```
#### Setters
```
set_brightness

# not checked
recording_cooloff_duration

set_audio_finetune
set_brightness
set_contract
set_debug_val1
set_delay_output
set_int_internet_connected
set_log_level
set_mac_in_flash
set_master_key
set_random_number
set_random_number2
set_register
set_remote_ip
set_sensor_register
set_storage_folder
set_temp_alert
set_temp_offset
set_upnp_port

```
#### Functions
```
audio_out1
audio_out0
brightness_plus
brightness_minus
check_cam_ready
check_fw_upgrade
check_upnp
contrast_plus
contrast_minus
enable_telnet
fb_stop
flipup
leaving
lr_stop
melody1
melody2
melody3
melody4
melody5
melodystop
move_backward
move_backward_cont
move_forward
move_forward_cont
move_left
move_left_cont
move_right
move_right_cont
pcmlog_enable
pcmlog_disable
reset_factory
reset_upnp
restart_system
restart_app
request_fw_upgrade
save_camera_name
save_http_usr_passwd
setup_led0
setup_led1
setup_wireless_save
switch_to_uap
take_snapshot
uapconfig_read
uapconfig_save
value_contract
value_battery
value_brightness
value_melody
value_resolution
value_setupled
value_temperature
value_wifi
vox_get_threshold
vox_set_threshold
vox_enable
vox_disable
vox_get_status
```
#### Codecs
```
VGA640_480
QVGA320_240
QQVGA160_120
```

## Dump video stream
### From hubbleconnect
url get from ajax on site
```
rtmpdump -r rtmp://IP:PORT/camera/blinkhd.SECRET.stream -o hubble.flv
```

### From camera to file
```
openRTSP -4 -w 1280 -h 720 -f 8 -d 60 rtsp://user:pass@IP:6667/blinkhd > stream.mp4
```
### From camera to multiple files by time
```
openRTSP -4 -w 1280 -h 720 -f 8 -F stream -P 120 -d 599 rtsp://user:pass@IP:6667/blinkhd
```
### From http
```
http://IP/-wvhttp-01-/video.cgi
http://IP/cgi/jpg/image.cgi
```

## External links
- [View your hubble camera stream whereever you want](http://blok.tiyun.de/2015/view-your-hubble-camera-stream-whereever-you-want)
- [Improving the Motorola Blink Baby Monitor/Camera](http://www.surfrock66.com/improving-the-motorola-blink-baby-monitorcamera-part-4/)
