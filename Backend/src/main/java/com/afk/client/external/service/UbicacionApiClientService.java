package com.afk.client.external.service;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.control.dto.GoogleGeocodeResponse;
import com.afk.model.entity.enums.EstadoUbicacion;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class UbicacionApiClientService {

    private final WebClient googleMapsWebClient;
    private final WebClient ubicacionWebClient;
    ObjectMapper objectMapper;

    private UbicacionDt mapToUbicacionDto(GoogleGeocodeResponse response) {

        if ("ZERO_RESULTS".equals(response.getStatus())) {
            return null;
        }

        var result = response.getResults().get(0);

        return new UbicacionDt(
                null,
                null,
                result.getFormatted_address(),
                result.getGeometry().getLocation().getLat(),
                result.getGeometry().getLocation().getLng(),
                EstadoUbicacion.ACTIVA
        );
    }

    public UbicacionApiClientService(
            @Qualifier("googleMapsWebClient") WebClient googleMapsWebClient,
            @Qualifier("ubicacionWebClient") WebClient ubicacionWebClient) {
        this.googleMapsWebClient = googleMapsWebClient;
        this.ubicacionWebClient = ubicacionWebClient;
        this.objectMapper = objectMapper;
    }

    public Mono<UbicacionDt> obtenerCoordenadas(String direccion) {
        return googleMapsWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/geocode/json")
                        .queryParam("address", direccion)
                        .build())
                .retrieve()
                .bodyToMono(GoogleGeocodeResponse.class)
                .flatMap(response -> {
                    if ("ZERO_RESULTS".equals(response.getStatus())) {
                        return Mono.empty();
                    }
                    return Mono.just(mapToUbicacionDto(response));
                });
    }

    public Mono<UbicacionDt> obtenerUbicacionPorId(Long id) {
        return ubicacionWebClient.get()
                .uri("/ubicaciones/{id}", id)
                .retrieve()
                .bodyToMono(UbicacionDt.class);
    }

    private UbicacionDt parsearRespuestaGeocoding(String jsonResponse) {
        try {
            JsonNode root = this.objectMapper.readTree(jsonResponse);
            String status = root.path("status").asText();
            if (!"OK".equals(status)) {
                throw new RuntimeException("Error en Geocoding API: " + status);
            }
            JsonNode result = root.path("results").get(0);
            String nombre = result.path("formatted_address").asText();
            double lat = result.path("geometry")
                    .path("location")
                    .path("lat")
                    .asDouble();
            double lng = result.path("geometry")
                    .path("location")
                    .path("lng")
                    .asDouble();
            return new UbicacionDt(
                    null,
                    null,
                    nombre,
                    lat,
                    lng,
                    EstadoUbicacion.ACTIVA
            );
        } catch (Exception e) {
            throw new RuntimeException("Error parseando respuesta de Google Maps", e);
        }
    }
}