import { FlatList, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [newNote, setNewNote] = useState("");
  const [selectedNoteDate, setSelectedNoteDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const storedCourses = await AsyncStorage.getItem('courses');
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        }
      } catch (e) {
        console.error('Hataa!!', e);
      }
    };

    loadCourses();
  }, []);

  const handleCourseAdd = async () => {
    if (newCourseName.trim() === "") return;

    const newCourse = {
      name: newCourseName,
      id: Date.now().toString(),
      notes: [],
    };

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    setNewCourseName("");

    try {
      await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error('Hata!!', e);
    }
  };

  const handleCourseDelete = async (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    setSelectedCourseId(null);

    try {
      await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error('Hata!!', e);
    }
  };

  const handleNoteAdd = async () => {
    if (newNote.trim() === "" || !selectedCourseId) return;

    const noteWithDate = {
      text: newNote,
      date: selectedNoteDate.toISOString().split('T')[0],
    };

    const updatedCourses = courses.map((course) => {
      if (course.id === selectedCourseId) {
        return { ...course, notes: [...course.notes, noteWithDate] };
      }
      return course;
    });

    setCourses(updatedCourses);
    setNewNote("");
    setSelectedNoteDate(new Date());

    try {
      await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error(' Hata!!', e);
    }
  };

  const handleNoteDelete = async (courseId, noteIndex) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        const updatedNotes = [...course.notes];
        updatedNotes.splice(noteIndex, 1);
        return { ...course, notes: updatedNotes };
      }
      return course;
    });

    setCourses(updatedCourses);

    try {
      await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
    } catch (e) {
      console.error('Hata!!', e);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setSelectedNoteDate(selectedDate);
    }
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}  // Klavyenin yukarı kaydırma mesafesini ayarlayın
    >
      <TextInput
        style={styles.input}
        placeholder="Yeni konu başlığı ekle"
        value={newCourseName}
        onChangeText={(text) => setNewCourseName(text)}
      />
      <Button title="Konu Başlığı Ekle" onPress={handleCourseAdd} />

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCourseId(item.id)}>
            <View style={[styles.courseContainer, selectedCourseId === item.id && styles.selectedCourse]}>
              <View style={styles.courseHeader}>
                <Text style={styles.content}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleCourseDelete(item.id)}>
                  <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>

              {selectedCourseId === item.id && (
                <>
                  {item.notes.map((note, index) => (
                    <View key={index} style={styles.noteContainer}>
                      <Text style={styles.noteText}>{note.text}</Text>
                      <Text style={styles.noteDate}>{note.date}</Text>
                      <Button title="Sil" onPress={() => handleNoteDelete(item.id, index)} color="red"/>
                    </View>
                  ))}

                  <TextInput
                    style={styles.input}
                    placeholder="Yeni not ekle"
                    value={newNote}
                    onChangeText={(text) => setNewNote(text)}
                  />
                  <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                    <FontAwesome name="calendar" size={24} color="black" />
                    <Text style={styles.dateText}>Not Tarihi: {selectedNoteDate.toISOString().split('T')[0]}</Text>
                  </TouchableOpacity>
                  {isDatePickerVisible && (
                    <DateTimePicker
                      value={selectedNoteDate}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                  <Button borderRadius="10" title="Ekle" onPress={handleNoteAdd} color="blue"  />

                  <Button title="Geri Dön" onPress={handleBackToCourses} />
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  courseContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  selectedCourse: {
    backgroundColor: "#64B5F6",
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: 'white',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  noteDate: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

