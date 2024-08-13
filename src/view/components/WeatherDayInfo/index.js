import { Button, Card, Flex, Typography, Input, Form, notification} from 'antd';
import { SearchOutlined, EnvironmentOutlined} from '@ant-design/icons'
import { API_KEY, API_URL } from 'core/constants';
import { useEffect, useState } from 'react';
import { findWeatherDate } from 'core/helpers/findWeatherDate';
import './index.css'

const { Title } = Typography

const WeatherDayInfo = () => {
    const [list, setList] = useState([]);
    const [countryInput, setCountryInput] = useState([])
    

    const fetchWithLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const Latitude = position.coords.latitude; 
            const Longitude = position.coords.longitude;
            
            const forecast = `${API_URL}forecast?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;
            findWeatherDate()
            fetch(forecast)
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setList(data.list)
            })
            .catch(error => {
                notification.error({
                    message: 'error',
                    description: error
                })
            })
        })        
    }    

    useEffect(() => {
        const input = document.getElementById('countryInput')
        setCountryInput(input)  
    })
   
    const fetchWithCountryName = () => {
        
        const weather = `${API_URL}forecast?q=${countryInput.value}&appid=${API_KEY}&units=metric`;
        fetch(weather)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            setList(data.list)
        })
        .catch(error => {
            notification.error({
                message: 'error',
                description: error
            })
        })
    }


    return(
        <div className="main_section">
            
            <Form 
                className="ant_form"
                onFinish={fetchWithCountryName}
                >
                <Form.Item 
                    layout="vertical"
                    name="country" 
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!'
                        }
                    ]}
                >
                    <Input type="text" placeholder="Type Country" id="countryInput"/>
                </Form.Item>
                    
                <Form.Item>
                    <Button 
                        className="ant_button" 
                        onClick={fetchWithCountryName}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Email!'
                        }
                    ]}    
                    >
                        <SearchOutlined />
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button className="ant_button" onClick={fetchWithLocation}>
                        <EnvironmentOutlined />
                    </Button>     
                </Form.Item>
                
            </Form>
            {/* <Title level={2}>{countryInput.value}</Title> */}
            <Flex className="flex_section" align="center" justify="center" gap={"20px"} wrap style={{height: "100vh"}} >

                {
                    list.map((item, index) => {
                        const { dt_txt, main, weather, dt, } = item
                        if(index % 8 === 0) {
                            return (
                                <Card className="ant_card" title={findWeatherDate(dt_txt)} style={{ width: 170 }} styles={{header: {color: "white"}}} key={dt} hoverable header={{color:"white"}}>
                                    <p>Time:{dt_txt.slice(10, -3)}</p>
                                    <p>{Math.ceil(main.temp)}C<sup>o</sup></p>
                                    <p><img width="75" src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="icon"></img></p>
                                    <Title level={5} type="secondary">{weather[0].description}</Title>
                                </Card>
                            )
                        }
                        return null
                    })
                }
            </Flex>
        </div>
        
    )
}

export default WeatherDayInfo