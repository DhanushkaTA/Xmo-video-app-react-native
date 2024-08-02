import React, { useState, useEffect } from 'react'

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try{
            const video_data = await fn();

            setData(video_data)
        }catch(e){
            Alert.alert('Error', e.message)
        }finally{
            setIsLoading(false);
        }

        }

    useEffect(() => {
        fetchData()
    },[]);

    const refetch = () => fetchData();

    return { data, isLoading, refetch};
}

export default useAppwrite;