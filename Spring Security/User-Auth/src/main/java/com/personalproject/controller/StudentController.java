package com.personalproject.controller;

import com.personalproject.model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {

    List<Student> students= new ArrayList<>();

    StudentController(){
        this.students.add(new Student(1, "chandra", 50));
        this.students.add(new Student(2, "lokesh", 60));
    }

    @GetMapping("/students")
    List<Student> getAllStudents(){
        return students;
    }

    @PostMapping("/students")
    void addStudent(@RequestBody Student student){
        this.students.add(student);
    }
}
