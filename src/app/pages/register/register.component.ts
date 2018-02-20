import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {
    loading = false;
    registerForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    password: FormControl;
    birthdate: FormControl;

    constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.firstName = new FormControl('', Validators.required);
        this.lastName = new FormControl('', Validators.required);
        this.email = new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]);
        this.password = new FormControl('', Validators.required);
        this.birthdate = new FormControl('');
    }

    createForm() {
        this.registerForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            birthdate: this.birthdate
        });
    }

    register() {
        this.loading = true;
        const user = new User();

        user.firstname = this.registerForm.value.firstName;
        user.lastname = this.registerForm.value.lastName;
        user.username = this.registerForm.value.email;
        user.password = this.registerForm.value.password;

        this.userService.create(user).subscribe(
            data => {
                this.alertService.success('Registration successful');
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error.error.message);
                this.loading = false;
            });
    }
}
