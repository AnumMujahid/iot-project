//Reading heart rate or beats per minute (BPM) using a Penpheral Beat Amplitude (PBA) algorithm
#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>
#include <heartRate.h>
#include <MAX30105.h>
#include <Wire.h>

MAX30105 particleSensor;
WiFiClient client;    

//Wifi Settings
const char *ssid =  "<YOUR_WIFI_USERNAME>"; //Wi-Fi Username
const char *pass =  "<YOUR_WIFI_PASSWORD>"; //Wi-Fi Password

//Firebase Settings
#define FIREBASE_HOST "<YOUR_DATABASE_URL>" //Firebase realtime database url
#define FIREBASE_AUTH "<YOUR_DATABASE_SECRET>" //Firebase realtime database secret

FirebaseData firebaseData;

//Setting variables
const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good
byte rates[RATE_SIZE]; //Array of heart rates
float beatsPerMinute;
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred
int beatAvg;
float vref = 3.3;
float resolution = vref/1023;
 
void setup()
{
  Serial.begin(9600);
  Serial.println("Connecting Wifi...");
  delay(2000);
  Serial.println("Connecting to ");
  Serial.println(ssid);

  //Initiating wifi
  WiFi.begin(ssid, pass);

  //Initiating firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  //Checking wifi status
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
  delay(2000);
  Serial.println("Initializing...");
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("Heartbeat sensor failed, Heartbeat sensor not found");
    while (1);
  }
  Serial.println("Place your index finger on the sensor.");
  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
  Serial.println("Place Finger on the sensor.");
  delay(2000);
}
  
void loop()
{
  for(int i=0;i<500;i++)
    Heart_Beat();
  Serial.print("BPM=");
  Serial.print(beatsPerMinute);
  Serial.print(", Avg BPM=");
  Serial.print(beatAvg); 
  Serial.println();

    //To set and push data with timestamp, requires the JSON data with .sv placeholder
    FirebaseJson json;
    json.set("bpm", beatsPerMinute);
    json.set("avgBpm", beatAvg);
    //now we will set the timestamp value
    json.set("timestamp/.sv", "timestamp"); // .sv is the required place holder for sever value which currently supports only string "timestamp" as a value
    //Push data with timestamp
    Serial.printf("Push data with timestamp... %s\n", Firebase.pushJSON(firebaseData, "/bpm", json) ? "ok" : firebaseData.errorReason().c_str());
  delay(5000);
}

void Heart_Beat(){
  long irValue = particleSensor.getIR();
  if (checkForBeat(irValue) == true)
  {
    //We sensed a beat!
    long delta = millis() - lastBeat;
    lastBeat = millis();
    beatsPerMinute = 60 / (delta / 1000.0);
    if (beatsPerMinute < 255 && beatsPerMinute > 20)
    {
      rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
      rateSpot %= RATE_SIZE; //Wrap variable

      //Take average of readings
      beatAvg = 0;
      for (byte x = 0 ; x < RATE_SIZE ; x++)
      beatAvg += rates[x];
      beatAvg /= RATE_SIZE;
    }
  }
    
  if (irValue < 50000){
    beatsPerMinute = 0;
    beatAvg = 0;
  }
}
