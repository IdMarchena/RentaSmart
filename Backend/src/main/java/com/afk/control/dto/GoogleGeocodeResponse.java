package com.afk.control.dto;

import lombok.Data;

import java.util.List;

@Data
public class GoogleGeocodeResponse {
    private String status;
    private List<Result> results;

    @Data
    public static class Result {
        private Geometry geometry;
        private String formatted_address;
    }

    @Data
    public static class Geometry {
        private Location location;
    }

    @Data
    public static class Location {
        private double lat;
        private double lng;
    }
}
