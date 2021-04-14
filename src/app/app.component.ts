import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./app.service";
import { CityData, CountryData, StateData } from "./app.model";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Near City Search";
  countries: CountryData[] = [];
  states: StateData[] = [];
  cities: CityData[] = [];
  nearCities: CityData[] = [];

  searchForm = this.fb.group({
    country: ["", Validators.required],
    state: ["", Validators.required],
    city: ["", Validators.required]
  });
  constructor(private appService: AppService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.appService.getCountries().subscribe((res: any) => {
      this.countries = res.data as CountryData[];
    });
  }

  changeCountry() {
    this.appService
      .getStatesByCountry(this.country.value.code)
      .subscribe((res: any) => {
        this.states = res.data as StateData[];
      });
    this.nearCities = [];
  }
  changeState() {
    this.appService
      .getCitiesByState(this.country.value.code, this.state.value.isoCode)
      .subscribe((res: any) => {
        this.cities = res.data as CityData[];
      });
    this.nearCities = [];
  }

  changeCity() {
    this.nearCities = [];
  }
  onSubmit() {
    this.appService
      .getCitiesNearCity(this.city.value.id)
      .subscribe((res: any) => {
        const cities = res.data || [];
        this.nearCities = cities.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      });
  }

  get country() {
    return this.searchForm.get("country");
  }

  get state() {
    return this.searchForm.get("state");
  }

  get city() {
    return this.searchForm.get("city");
  }
}
