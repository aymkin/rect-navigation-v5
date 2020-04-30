import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "./context";

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Calendar = ({ navigation}) => (
  <ScreenContainer>
    <Text style={styles.screenHeader}>Calendar Screen</Text>
    <Text>List of available Screens</Text>
    <Button
      title="Reservation 12345"
      onPress={() => navigation.push('Details', {
        reservationId: '12345',
        guest: 'Mr. John Doe',
        arrivalDate: 'Feb 31, 1999'
      })
      }
    />
    <Button
      title="Reservtion 67890"
      onPress={() => navigation.push('Details', {
        reservationId: '67890',
        guest: 'Mr. Jordan Micle',
        arrival: 'Feb 31, 2999'
      })}
    />
  </ScreenContainer>
);

export const Details = ({ route, navigation }) => (
  <ScreenContainer>
    {route.params.reservationId && (
      <Text>Reservation: {route.params.reservationId}</Text>
    )}
    {route.params.guest && <Text>Guest: {route.params.guest}</Text>}
    {route.params.arrival && <Text>Arrival: {route.params.arrival}</Text>}
    <Button
      title="Push another screen on top"
      onPress={() => navigation.push("Details", {})}
    />
    <Button title="go back" onPress={() => navigation.goBack()} />
    <Button title="pop" onPress={() => navigation.pop()} />
    <Button title="pop to top" onPress={() => navigation.popToTop()} />

  </ScreenContainer>
);

export const Search = () => (
  <ScreenContainer>
    <Text style={styles.screenHeader}>Search Screen</Text>
    <Button title="Go to search 2 screen" onPress={() => console.log('push on stack another' +
      ' screen')} />
    <Button
      title="Go back to calendar Tab"
      onPress={() => console.log('navigate to calendar')}
    />
    <Button title="Open Drawer" onPress={() => console.log('open drawer navigation')} />
  </ScreenContainer>
);

export const Search2 = () => (
  <ScreenContainer>
    <Text style={styles.screenHeader}>Search2 Screen</Text>
  </ScreenContainer>
);

export const Profile = ({ navigation}) => {
  const { signout } = useContext(AuthContext)
  return (
    <ScreenContainer>
      <Text style={styles.screenHeader}>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signout()} />
    </ScreenContainer>
  );
};

export const SignIn = () => {
  const { signin } = useContext(AuthContext)
  return (
    <ScreenContainer>
      <Text style={styles.screenHeader}>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signin()} />
      <Button
        title="Create Account"
        onPress={() => console.log('Create Account')}
      />
    </ScreenContainer>
  );
};

export const CreateAccount = () => {

  return (
    <ScreenContainer>
      <Text style={styles.screenHeader}>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => console.log('Sign Up')} />
    </ScreenContainer>
  );
};

export const Splash = () => (
  <ScreenContainer>
    <Text style={styles.screenHeader}>Loading...</Text>
  </ScreenContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  screenHeader: {
    fontSize: 32
  }
});


