 cordova create warikantan  com.wixsite.cybertube.warikantan    warikantan  
 cordova platform add android
 Using cordova-fetch for cordova-android@^8.0.0

C:\Users\maeda\Documents\cordova\warikantan>cordova platform add browser
Using cordova-fetch for cordova-browser@^6.0.0

----------------------------------------------------------


keytool -genkey -v -keystore .keystore -alias warikantan  -keyalg RSA -validity 10000

password adeamk123

jarsigner -verbose -keystore .keystore app-release-unsigned.apk  warikantan


java -jar pepk.jar --keystore=.keystore --alias=warikantan --output=encrypted_private_key_path --

java -jar pepk.jar --keystore=.keystore --alias=warikantan --output=encrypted_keystore --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a

jarsigner -verbose -keystore upload_cert.der app-release-unsigned.apk  warikantan

zipalign -v 4 app-release-unsigned.apk app-release-signed.apk

java bundletool-all-0.9.0.jar build-apks --bundle=bundle.aab \
                        --output=app.apks \
                        --ks=keystore.jks \
                        --ks-pass=pass:store_password \
                        --ks-key-alias=key-alias \
                        --key-pass=pass:key_password


