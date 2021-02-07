import * as React from 'react';
import { Appbar,Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Header = ({name}) => (
    <Appbar.Header
        theme={{colors:{
            primary:"#00aaff"
        }}}
        style={{flexDirection:"row",justifyContent:"center"}}>
        <Title style={{color:"white"}}>{name}</Title>
    </Appbar.Header>
 );

export default Header

