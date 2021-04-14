import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_KEY } from "./app.constants";

@Injectable()
export class AppService {
  private baseURL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
  private headers = { "x-rapidapi-key": API_KEY };

  constructor(private httpClient: HttpClient) {}

  getCountries() {
    // GET METHOD
    const uri = "/countries";
    return this.httpClient.get<any>(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getStatesByCountry(countryCode: string) {
    // GET METHOD
    const uri = `/countries/${countryCode}/regions`;
    return this.httpClient.get<any>(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getCitiesByState(countryCode: string, stateIsoCode: string) {
    // GET METHOD
    const uri = `/countries/${countryCode}/regions/${stateIsoCode}/cities`;
    return this.httpClient.get<any>(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getCitiesNearCity(cityId: string) {
    // GET METHOD
    const radius = 100; // needed as param query
    const uri = `/cities/${cityId}/nearbyCities`;
    return this.httpClient.get<any>(this.baseURL + uri, {
      headers: this.headers
    });
  }
}
