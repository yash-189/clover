import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext();




const AppProvider = ({ children }) => {
    // const [show, setShow] = useState(false);

    const initialState = {
        loading:true,
        search:"Trending",
        CarouselData: [],
        ImageBoxData:[],
        page:1,
        show:false
    }

    const reducer = (state, action) => {
        switch (action.type) {
        
            case "Search_Anime":
                return {
                    ...state,
                    loading:false,
                    search: action.payload
                }
                break;
            case "Carousel_Data":
                return {
                    ...state,
                    loading:false,
                    CarouselData: action.payload.CarouselData
                }
                break;
            case "Imagebox_Data":
                return {
                    ...state,
                    loading:false,
                    ImageBoxData: action.payload.ImageBoxData
                }

                break;
               

                case "loadingTrue":
                    return {
                        ...state,
                        Loading:true
                    }
                    break;

               
            default:
                break;
        }
        return 
    }

    const [state, dispatch] = useReducer(reducer, initialState);



    const getData = async (url) => {
        dispatch({type:"loadingTrue"});

        try {
        const data = await fetch(url)
        const parsedData = await data.json()
        // console.log(parsedData);
        if (parsedData.results) {
            dispatch({
                type:"Carousel_Data",
                payload:{
                    CarouselData: parsedData.results
                }
            })
        } else {
            dispatch({
                type:"Imagebox_Data",
                payload:{
                    ImageBoxData: parsedData.data
                }
            })
        }
        
       
        
        } catch (error) {
            console.log(error);
        }
        

    }

   

const SearchAnime = (searchquery)=>{
    dispatch({
        type:"Search_Anime",
        payload: searchquery
    })

}

const submitHandler = (e) => {
    e.preventDefault();

    // dispatch({
    //     type:"Search_Anime",
    //     payload: searchquery
    // })
    
    getData(`https://api.jikan.moe/v3/search/anime?q=${state.search}&page=${state.page}`);
}
    useEffect(() => {
        getData(`https://api.jikan.moe/v3/search/anime?q=${state.search}`);
        // dispatch({type:"loadingTrue"});
        // getData("https://api.jikan.moe/v4/top/anime")
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // getData("https://api.jikan.moe/v4/top/anime")
        // dispatch({type:"loadingTrue"});
        getData("https://api.jikan.moe/v4/top/anime")
        // eslint-disable-next-line
    }, [])


    return (
        <AppContext.Provider value={{...state, submitHandler,SearchAnime}} >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext };