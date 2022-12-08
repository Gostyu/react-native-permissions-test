import React, { useCallback } from "react";
import { Alert } from "react-native";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

export const usePermissions = () =>{
    const handlePermissions = useCallback(async () =>{
        
        const valueChecked = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
                
        if(valueChecked === RESULTS.BLOCKED){
            const valueAfterRequest = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

            if(valueAfterRequest === RESULTS.BLOCKED){
                Alert.alert("Important", "Veuillez autoriser l'accès à la camera et aux photos", [{
                    onPress : async () => {
                        try{
                            await openSettings();
                        }catch(err){
                            console.error("[openSettings| error]",err);
                        }
                    }
                }])
            }
        }

    }, [])

    return {
        handlePermissions
    }
}