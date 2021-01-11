import React, { useState, useEffect } from "react";
import { Container, Text, Card, Content, CardItem, Body, Header } from 'native-base';
import nasa from "../api/nasa";

const DetailScreen = ({ route }) => {

    const id = route.params.itemId;

    const [responseResult, setResponseResult] = useState('');


    const [err, setErr] = useState(null);


    useEffect(() => {
        getAestroidData();
    }, [])

    const getAestroidData = async () => {

        await nasa.get(`${id}?api_key=rOt2BvDsOG4L5bjUh60ggCkVrYHXlREZ9xNDZkHM`).then(response => {
            setResponseResult(response.data);

        }).catch(err => {
            setErr(err);

        });
    }


    const responseOfHaz = () => {
        if (responseResult.is_potentially_hazardous_asteroid === false) {

            return <Text>False</Text>

        } else {
            return <Text>True</Text>

        }
    };


    //const { itemId } = route.params;

    //console.log(route);
    return (
        <Container style={{ flex: 1 }}>

            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text>Asteroid Name </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>
                                {responseResult.name}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text>Nasa Jpl Url</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>
                                {responseResult.nasa_jpl_url}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>


            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text>Is Potentially Hazardous Asteroid</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>
                                {responseOfHaz()}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

        </Container>
    );
}


export default DetailScreen;