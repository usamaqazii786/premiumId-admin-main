import * as VoxImplant from "voximplant-websdk"

// Please install the Voximplant.WebSDK library before running this script: npm install vo
const sdk = VoxImplant.getInstance();
const login = async () => {
    try {
        await sdk.init();
            console.log("SDK is ready!");
        try {
            await sdk.connect();
            console.log("Connected");
        } catch (e) {
            console.log("Connection failed!");
        }
        try {
            await sdk.login("hnhtechsolutionsemail@gmail.com","Kraken24!@!");
            console.log("Logged in!");
        } catch (e) {
            console.log("Login failure!");
            console.log(e, "error login")
        }
    } catch (e) {
    
        console.log("SDK init failure!");
    }
};

login();

export default sdk