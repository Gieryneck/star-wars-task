import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { CharService } from '../../core/services/char.service';

@Component({
  selector: 'sl-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  public form = this.formBuilder.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    gender: ['', Validators.required],
    homeworld: ['']
  });
  public formSubmitted = false;
  public postReqPending = false;
  public species: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private charService: CharService) {}

  ngOnInit() {
    this.route.data.subscribe((data: { species: string[] }) => {
      this.species = data.species;
    });
  }

  public checkForInvalidField(control: FormControl): boolean {
    return control.invalid && (control.touched || this.formSubmitted) ? true : false;
  }

  public onSubmit() {
    this.formSubmitted = true;
    this.trimStringControls();

    if (this.form.invalid) {
      return;
    }
    this.addCharacter();
  }

  private trimStringControls(): void {
    Object.keys(this.form.controls).forEach(controlKey => {
      const control = this.form.get(controlKey);

      if (typeof control.value === 'string') {
        control.patchValue(control.value.trim());
      }
    });
  }

  private addCharacter(): void {
    this.postReqPending = true;
    this.charService.addCharacter(this.form.value).subscribe(() => {
      this.postReqPending = false;
      this.navigateToListView();
    });
  }

  private navigateToListView(): void {
    this.router.navigate(['/listview']);
  }

}
