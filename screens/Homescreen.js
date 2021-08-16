import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
    constructor(){
        
            super();
            this.state = 
            { 
            text: '',
             isSearchPressed: '', 
             word: '' ,
            lexicalCategory:'',
            examples:[],
            defination:""   };
          

    }
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"   
        

        return fetch(url)
        .then((data) => {
            if(data.status === 200) {
                return data.json()
            } else {
                return null
            }
        })
        .then((response) => {
            var responseObject = response

            if(responseObject) {
                var wordData = responseObject.definitions[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word": this.state.text,
                    "defination": definition,
                    "lexicalCategory": lexicalCategory
                })
            } else {
                this.setState({
                    "word": this.state.text,
                    "defination": "Not Found",
                    "lexicalCategory": "Not Found"
                })
            }
        })
    }


render() {
    return (
      <SafeAreaProvider>
        <Header
          backgroundColor={'#70ae98'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: { color: 'white', fontSize: 30, fontFamily: 'French Script MT' },
          }}
        />

<TextInput
style={styles.textInput}
onChangeText={text => {
  this.setState({
    text: text,
    isSearchPressed:false,
    word: 'Loading...',
    lexicalCategory: '',
    examples: [],
    defination: ''
  });
}}
value={this.state.text}
/>

        <TouchableOpacity
        style={styles.searchButton}
        
        onPress={()=>{
            this.setState({isSearchPressed:true});
            this.getWord(this.state.text)
        }}  
        ><Text style={styles.buttonText}>Search</Text></TouchableOpacity>



<SafeAreaProvider style={styles.detailsContainer}>
    <Text style={styles.outputtext}>
        Word:{this.state.text}
        </Text>
      
        <Text style={styles.outputtext2}>
        Type:{this.state.lexicalCategory}
        </Text> 
      

</SafeAreaProvider>

<SafeAreaProvider>
 
        <Text style={styles.outputtext}>
            Defination: {this.state.defination}
            </Text>
    </SafeAreaProvider>
        </SafeAreaProvider>


        
)} 
        



}

const styles = StyleSheet.create({
    searchButton: {
        marginLeft:900,
        marginTop:-20,
        width:140,
        height: 90,

        borderRadius: 50,
        borderWidth: 5,
        borderColor:'black',
        justifyContent: 'center',
      },
      textInput: {
          paddingLeft:50,
        width: 400,
        height: 80,
        borderWidth: 5,
    borderColor:'black',
        margin: 50,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
      },

      buttonText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
      outputtext:{
        fontWeight: 'bold',
        fontSize: 30,
      },
      outputtext2:{
        marginTop:100,
        fontWeight: 'bold',
        fontSize: 30,
      }



})