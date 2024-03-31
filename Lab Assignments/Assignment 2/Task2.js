import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const StudentRecordApp = () => {
  const [studentName, setStudentName] = useState('');
  const [studentGPA, setStudentGPA] = useState('');
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchGPA, setSearchGPA] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const addStudentRecord = () => {
    if (studentName && studentGPA) {
      setStudents([...students, { name: studentName, gpa: parseFloat(studentGPA) }]);
      setStudentName('');
      setStudentGPA('');
    } else {
      alert('Please enter student name and GPA.');
    }
  };

  const searchStudentRecord = () => {
    const result = students.filter(student => student.name.includes(searchName) && student.gpa.toString().includes(searchGPA));
    setSearchResult(result);
  };

  const clearSearchResult = () => {
    setSearchName('');
    setSearchGPA('');
    setSearchResult(null);
  };

  const renderStudent = ({ item }) => (
    <View style={styles.studentItem}>
      <Text>Name: {item.name}</Text>
      <Text>GPA: {item.gpa}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Record Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Student GPA"
        keyboardType="numeric"
        value={studentGPA}
        onChangeText={setStudentGPA}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addStudentRecord} />
        <Button title="Search" onPress={searchStudentRecord} />
      </View>
      
      <Text style={styles.subHeader}>Records</Text>
      {searchResult && (
        <FlatList
          data={searchResult}
          renderItem={renderStudent}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Clear All" onPress={clearSearchResult} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:50,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  studentItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default StudentRecordApp;
