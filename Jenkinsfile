/**
 * Cordova Jenkinsfile
 */

def platform = params?.PLATFORM?.trim()                      // e.g. "ios" or "android"
BUILD_CONFIG = params?.BUILD_CONFIG?.trim()                 // e.g. "Debug" or "Release"
CODE_SIGN_PROFILE_ID = params?.BUILD_CREDENTIAL_ID?.trim()   // e.g. "redhat-dist-dp"

PROJECT_NAME = "AeroGear Cordova Showcase"
CLEAN = true                          // Do a clean build and sign
INFO_PLIST = "${PROJECT_NAME}/${PROJECT_NAME}-Info.plist"
VERSION = "1.0.0"
SHORT_VERSION = "1.0"
BUNDLE_ID = "org.aerogear.cordova-showcase-template"
OUTPUT_FILE_NAME="${PROJECT_NAME}-${BUILD_CONFIG}.ipa".replace(" ", "").toLowerCase()
SDK = "iphoneos"

if (BUILD_CONFIG.toLowerCase() == "debug") {
    OSX_BUILD_CONFIG = "Debug"
} else if(BUILD_CONFIG.toLowerCase() == "release" || BUILD_CONFIG.toLowerCase() == "distribution") {
    OSX_BUILD_CONFIG = "Release"
}

node(platform) {
    deleteDir()
    stage("Checkout") {
        checkout scm
    }

    stage("Prepare") {
        sh 'npm i'
        sh "ionic cordova platform rm ${platform}"
        sh "ionic cordova platform add ${platform}"
        sh "ionic cordova prepare ${platform}"
    }

    stage("Build") {
        if (platform == 'android') {
            if (BUILD_CONFIG == 'debug') {
                sh "ionic cordova build ${platform} --debug"
            } else {
                sh "ionic cordova build ${platform} --release"
            }
        } else {
            xcodeBuild(
                    cleanBeforeBuild: CLEAN,
                    src: "./platforms/${platform}",
                    schema: "${PROJECT_NAME}",
                    workspace: "${PROJECT_NAME}",
                    buildDir: "build",
                    sdk: "${SDK}",
                    version: "${VERSION}",
                    shortVersion: "${SHORT_VERSION}",
                    bundleId: "${BUNDLE_ID}",
                    infoPlistPath: "${INFO_PLIST}",
                    xcodeBuildArgs: 'ENABLE_BITCODE=NO OTHER_CFLAGS="-fstack-protector -fstack-protector-all"',
                    autoSign: false,
                    config: "${OSX_BUILD_CONFIG}"
            )
        }
    }

    stage("Sign") {
        if (platform == 'android') {
            if (BUILD_CONFIG == 'release') {
                def keyStoreId = params.BUILD_CREDENTIAL_ID
                def keyAlias = params.BUILD_CREDENTIAL_ALIAS ?: ''
                signAndroidApks (
                        keyStoreId: keyStoreId,
                        keyAlias: keyAlias,
                        apksToSign: "platforms/android/**/*-unsigned.apk",
                        // uncomment the following line to output the signed APK to a separate directory as described above
                        // signedApkMapping: [ $class: UnsignedApkBuilderDirMapping ],
                        // uncomment the following line to output the signed APK as a sibling of the unsigned APK, as described above, or just omit signedApkMapping
                        // you can override these within the script if necessary
                        // androidHome: '/usr/local/Cellar/android-sdk'
                )
            } else {
                println('Debug Build - Using default developer signing key')
            }
        }
        if (platform == 'ios') {
            codeSign(
                    profileId: "${CODE_SIGN_PROFILE_ID}",
                    clean: CLEAN,
                    verify: true,
                    ipaName: OUTPUT_FILE_NAME,
                    appPath: "platforms/ios/build/${OSX_BUILD_CONFIG}-${SDK}/${PROJECT_NAME}.app"
            )
        }
    }

    stage("Archive") {
        if (platform == 'android') {
            archiveArtifacts artifacts: "platforms/android/app/build/outputs/apk/${BUILD_CONFIG}/app-${BUILD_CONFIG}.apk"
        }
        if (platform == 'ios') {
            archiveArtifacts artifacts: "platforms/${platform}/build/${OSX_BUILD_CONFIG}-${SDK}/${OUTPUT_FILE_NAME}"
        }
    }
}
