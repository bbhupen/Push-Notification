const publicVapidKey = "BLDWl3yIGDWt1r0ZBxTTbmBW4aWS_ANClYl3EOmxh7FAANHQWEJOS0lMSeGaoha65eXG2GppZbkI7ne5dVzpz3Y"

const button = document.getElementById('notifications');


button.addEventListener('click', () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      randomNotification();
    }
  });
})




//Register Service Worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

async function send() {
    console.log("Register SW")

    const register = await navigator.serviceWorker.register("/sw.js", { scope: '/' })
    console.log("SW registered") 

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })

    await fetch("/subscribe", {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })


}



function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}