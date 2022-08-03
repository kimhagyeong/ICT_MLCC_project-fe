import React, { useEffect } from "react";
import api from "../../api"
import Default from "./default"

export default (props) => {
    const getSettingMode = async () => {
        var access = getCookie("access")
        if (access !== null) {
            access = access.replace("access=", "")
            if (access !== null || access !== "") {
                // api 호출문 작성, 성공시 
                try {
                    var header = {
                        headers: {
                            token: access
                        }
                    }
                    var response = await api.getSettingMode(header)
                    // var response = await api.getSettingMode()
                    if (response.data === "manual") {
                        window.location.href = '/manual/'
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }

    useEffect(() => {
        getSettingMode()
        return () => {
            getSettingMode()
        };
    }, []);

    const getCookie = (name) => {
        // 변수를 선언한다.
        const cookies = document.cookie.split(";");

        // 쿠키를 추출한다.
        for (var i in cookies) {
            if (cookies[i].search(name) !== -1) {
                return cookies[i];
            }
        }
        return null;
    };

    return (
        <Default>

        </Default>
    )
}