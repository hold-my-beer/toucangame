import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateSettings } from "../actions/userActions";
import { USER_SET_SOUND_VOLUME } from "../constants/userConstants";

const SettingsScreen = ({ history }) => {
  const [musicVolume, setMusicVolume] = useState(0);
  const [effectsVolume, setEffectsVolume] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    setMusicVolume(
      userInfo && userInfo.settings && userInfo.settings.musicVolume
        ? parseInt(userInfo.settings.musicVolume)
        : 40
    );
    setEffectsVolume(
      userInfo && userInfo.settings && userInfo.settings.effectsVolume
        ? parseInt(userInfo.settings.effectsVolume)
        : 100
    );
  }, [userInfo]);

  useEffect(() => {
    const musicVolumeAudio = document.getElementById("musicVolumeAudio");

    if (musicVolumeAudio) {
      musicVolumeAudio.volume = musicVolume / 100;
    }

    const effectsVolumeAudio = document.getElementById("effectsVolumeAudio");

    if (effectsVolumeAudio) {
      effectsVolumeAudio.volume = effectsVolume / 100;
    }
  }, [musicVolume, effectsVolume]);

  const onAfterMusicChangeHandler = (e) => {
    dispatch({
      type: USER_SET_SOUND_VOLUME,
      payload: { ...userInfo, settings: { musicVolume, effectsVolume } },
    });
  };

  const onAfterEffectsChangeHandler = (e) => {
    const effectsVolumeAudio = document.getElementById("effectsVolumeAudio");
    effectsVolumeAudio.play();

    dispatch({
      type: USER_SET_SOUND_VOLUME,
      payload: { ...userInfo, settings: { musicVolume, effectsVolume } },
    });
  };

  const submitHandler = () => {
    dispatch(updateSettings(musicVolume, effectsVolume));
    history.goBack();
  };

  return (
    <div className="settings">
      <h1 className="mb-1">Настройки</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="danger" text={error} />
      ) : (
        <>
          <audio
            id="musicVolumeAudio"
            src="audio/bensound-adventure.mp3"
            autoPlay={true}
            loop={true}
          ></audio>
          <audio
            id="effectsVolumeAudio"
            src="audio/mixkit-winning-notification-2018.wav"
          ></audio>
          <button
            type="button"
            className="btn btn-light"
            onClick={history.goBack}
          >
            Назад
          </button>
          <div className="musicVolume settingsItem">
            <p>Громкость музыки</p>

            <Slider
              railStyle={{
                height: "12px",
                backgroundColor: "var(--sand-color)",
              }}
              trackStyle={{
                height: "12px",
                backgroundColor: "var(--primary-color)",
              }}
              handleStyle={{
                width: "25px",
                height: "25px",
                backgroundColor: "var(--primary-color)",
                borderColor: "var(--light-color)",
              }}
              value={musicVolume}
              onChange={(e) => {
                setMusicVolume(e);
              }}
              onAfterChange={onAfterMusicChangeHandler}
            />
          </div>
          <div className="effectsVolume settingsItem">
            <p>Громкость эффектов</p>

            <Slider
              railStyle={{
                height: "12px",
                backgroundColor: "var(--sand-color)",
              }}
              trackStyle={{
                height: "12px",
                backgroundColor: "var(--primary-color)",
              }}
              handleStyle={{
                width: "25px",
                height: "25px",
                backgroundColor: "var(--primary-color)",
                borderColor: "var(--light-color)",
              }}
              value={effectsVolume}
              onChange={(e) => setEffectsVolume(e)}
              onAfterChange={onAfterEffectsChangeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Сохранить
          </button>
        </>
      )}
    </div>
  );
};

export default SettingsScreen;
