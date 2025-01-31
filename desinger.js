// src/screens/desinger.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { db } from '../firebaseConfig'; // Firestore'u import edin
import { collection, addDoc } from 'firebase/firestore'; 

export default function Desinger() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        phone: phone,
      });
      setMessage('Kayıt başarılı: ' + docRef.id);
    } catch (e) {
      setMessage('Kayıt başarısız: ' + e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Ad Soyad</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={setName}
        value={name}
        placeholder="Adınızı ve Soyadınızı girin"
      />
      <Text>Email</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={setEmail}
        value={email}
        placeholder="Email adresinizi girin"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Telefon Numarası</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={setPhone}
        value={phone}
        placeholder="Telefon numaranızı girin"
        keyboardType="phone-pad"
      />
      <Button title="Kayıt Ol" onPress={handleRegister} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
