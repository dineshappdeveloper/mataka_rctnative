import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Repository from './repository/Repository';
import PreferenceManager from './PreferenceManager';
import { MOBILE } from './utils/constants';

const useDashboardController = () => {
    const [selectedSlider, setSelectedSlider] = useState(0);
    const [status, setStatus] = useState('LOADING');
    const [appStatus, setAppStatus] = useState('LOADING');
    const [imgList, setImgList] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        fetchGame();
        fetchAppDetails();
        fetchProfile();
    }, []);



    const fetchAppDetails = async () => {
        setAppStatus('LOADING');
        try {
            const appDetails = await Repository.getAppDetails();
            setAppStatus('COMPLETE');
            console.log("fetchAppDetails :", appDetails.data.contact_details);
            setAppData(appDetails.data.contact_details);
            setImgList(appDetails.data.banner);
        } catch (error) {
            setAppStatus('ERROR');
            Alert.alert('Error', 'Failed to fetch app details');
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await Repository.getProfile();
            console.log("fetchProfile :", response);
            if (response.code ==='100') {
                await PreferenceManager.save(MOBILE, response.data.mobile);
                setProfileData(response.data);
            } else {
                console.log("fetchProfile :", response.message);
                setProfileData(response.message);
            }
        } catch (error) {
            console.log("Error : ",error);
            Alert.alert('Error', 'Failed to fetch profile data');
        }
    };

    const fetchGame = async () => {
        setStatus('LOADING');
        try {
            const response = await Repository.getGame();
            if (response.code === '101') {
                setGameData(response.data);
                setStatus('COMPLETE');
            } else {
                console.log("fetchGame :", response.message);
                setGameData(response.data);
            }

        } catch (error) {
            setStatus('ERROR');
            Alert.alert('Error', 'Failed to fetch game data');
        }
    };

    return {
        selectedSlider,
        setSelectedSlider,
        imgList,
        profileData,
        gameData,
        appData,
        status,
        appStatus,
    };
};

export default useDashboardController;
