import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { View , StyleSheet, Pressable,Text} from 'react-native'
import { BottomTabParamList } from '../../navigation/BottomTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import colors from '../../theme/colors';

const SubHeader = () => {
      const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
        const route = useRoute();
      
    
  return (
          <View style={styles.headersub}>
      <Pressable>
        <Text onPress={()=>navigation.navigate('MainTabs')}  style={[styles.subheading, route.name=='Home'&& styles.activesubheading]}>Home</Text>
      </Pressable>
      <Pressable>
        <Text onPress={()=>navigation.navigate('Blogs')} style={[styles.subheading, route.name=='Blogs'&& styles.activesubheading]}>Blogs</Text>
      </Pressable> <Pressable>
        <Text onPress={()=>navigation.navigate('SkinCancerConcern')} style={[styles.subheading, route.name=='SkinCancerConcern'&& styles.activesubheading]}>Cancer Concern</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    headersub: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 30,
        marginBottom: 0,
      },
      subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Customize text color
      }, 
      activesubheading: {
        color: colors.primary.purple,
    
        fontSize: 18,
        fontWeight: 'bold',
      },
})

export default SubHeader