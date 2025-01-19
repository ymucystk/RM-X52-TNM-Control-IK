"use client";
import mqtt from 'mqtt'

//const MQTT_BROKER_URL = "wss://sora.uclab.jp/mqws";
//const MQTT_BROKER_URL = "wss://urdemo.uclab.jp/mqws";
const MQTT_BROKER_URL = "wss://sora2.uclab.jp/mqws";

// global private variable
export var mqttclient = null;

export const connectMQTT = () => {
    if (mqttclient == null) {
        console.log("New MQTT");
        const client = new mqtt.connect(MQTT_BROKER_URL);
        client.on("connect", () => {
            console.log("MQTT Connected", client);

            const date = new Date();
            const info = {
                date: date.toLocaleString(),
                device: {
                    browser: navigator.appName,
                    version: navigator.appVersion,
                    agent: navigator.userAgent,
                    platform: navigator.platform,
                    cookie: navigator.cookieEnabled
                },
                devId: "om"
            }
            client.publish('dev/register', JSON.stringify(info)) // for other devices.
            client.publish('dev/om' , JSON.stringify({ date: date.toLocaleString() })) // Just date for record

        });
        client.on('error', function (err) {
            console.error('MQTT Connection error: ');
        });
        mqttclient = client;
    }
    return mqttclient
}


export const subscribeMQTT = (topic) => {
    if (mqttclient == null) {
        connectMQTT();
    }
    mqttclient.subscribe(topic, (err) => {
        if (!err) {
            console.log('MQTT Subscribe topics', topic);
        } else {
            console.error('MQTT Subscription error: ', err);
        }
    });
}

export const publishMQTT = (topic, msg) => {
    mqttclient.publish(topic, msg);
}