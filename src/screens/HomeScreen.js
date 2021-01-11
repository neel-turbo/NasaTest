import React, { Component } from "react";
import { Container, Text, Button, Spinner, Card, CardItem, Body } from 'native-base';
import { ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

import nasa from "../api/nasa";

class HomeScreen extends Component {

    state = { res: '', asteroidID: '', error: '', loading: false, aestroidArray: [] };

    onSubmitAsteroid = async () => {

        const id = this.state.asteroidID;
        await nasa.get(`${id}?api_key=rOt2BvDsOG4L5bjUh60ggCkVrYHXlREZ9xNDZkHM`).then(response => {
            this.setState({ res: response.data, error: '' });

            this.props.navigation.navigate('Detail', { itemId: response.data.id });

            //console.log(this.state.res);
        }).catch(err => {
            this.setState({ error: err, res: '' });
            //this.setState({ res: '', loading: false });
            // console.log(this.state.error);
        });
    }



    onRandomAsteroid = async () => {

        this.setState({ loading: true });
        await nasa.get('browse?api_key=DEMO_KEY').then(response => {

            this.setState({ aestroidArray: response.data.near_earth_objects, error: '', loading: false });

            //console.log(this.state.aestroidArray);

        }).catch(err => {
            this.setState({ error: err, res: '' });
            //console.log(this.state.error);
            this.setState({ loading: false });
        })
    }

    onRenderButton() {
        if (this.state.asteroidID.length > 1) {
            return (
                <Button block primary style={{ margin: 10 }}
                    onPress={this.onSubmitAsteroid}>
                    <Text uppercase={false}>Search</Text>
                </Button>
            )

        }
        return (
            <Button block light style={{ margin: 10 }}
                onPress={this.onSubmitAsteroid}>
                <Text uppercase={false}>Search</Text>
            </Button>
        )
    }


    onRenderList() {
        if (this.state.loading) {
            return (<Spinner color='#397fe5' />)
        }
        return (
            <FlatList
                data={this.state.aestroidArray}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Detail', { itemId: item.id })}>
                            <Card >
                                <CardItem>
                                    <Body>
                                        <Text>
                                            {item.id}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    );
                }}
            />
        )
    }





    render() {


        return (
            <Container style={{ flex: 1 }}>

                <TextInput
                    style={{ borderBottomWidth: 2, borderColor: 'red', margin: 5 }}
                    placeholder="Enter Asteroid ID"
                    value={this.state.asteroidID}
                    onChangeText={(text) => this.setState({ asteroidID: text })}
                />

                {this.onRenderButton()}


                <Button block danger style={{ margin: 10 }}
                    onPress={this.onRandomAsteroid}>
                    <Text uppercase={false}>Random Asteroid</Text>
                </Button>


                {this.state.error ? <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Asteroid Not Found</Text> : null}

                {this.onRenderList()}
            </Container>
        );
    }
}


export default HomeScreen;