    package com.afk.control.controller;

    import com.afk.control.dto.UsuarioDto;
    import com.afk.control.service.UsuarioService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import com.afk.control.dto.JsonResponse;
    import java.util.List;

    @RestController
    @RequestMapping("/api/usuarios")
    @RequiredArgsConstructor
    public class UsuarioController {

        private final UsuarioService usuarioService;

        @PostMapping
        public ResponseEntity<JsonResponse<UsuarioDto>> crearUsuario(
                @RequestBody UsuarioDto usuarioDto) {
            UsuarioDto creado = usuarioService.createUsuario(usuarioDto);
            if (creado==null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuario no pudo ser creado", null, 404)
                );
            }
            return ResponseEntity.status(201).body(
                    new JsonResponse<>(
                            true,
                            "Usuario creado correctamente",
                            creado,
                            201
                    )
            );
        }

        @GetMapping("/{id}")
        public ResponseEntity<JsonResponse<UsuarioDto>> obtenerUsuarioPorId(@PathVariable Long id) {
            UsuarioDto usuario = usuarioService.findUsuarioById(id);
            if (usuario==null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuario no pudo ser obtenido", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "usuario obtenido",
                            usuario,
                            200

                    )
            );
        }

        @GetMapping
        public ResponseEntity<JsonResponse<List<UsuarioDto>>> listarUsuarios() {
            List<UsuarioDto> usuarios = usuarioService.findAllUsuarios();
            if (usuarios.isEmpty()) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuarios no pudieron ser obtenidos", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "usuarios listados correctamente",
                            usuarios,
                            200
                    )
            );
        }

        @PutMapping("/{id}")
        public ResponseEntity<JsonResponse<UsuarioDto>> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDto usuarioDto) {
            UsuarioDto actualizado = usuarioService.updateUsuario(id, usuarioDto);
            if (actualizado==null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuarios no pudo ser actualizado", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "usuario actualizado exitosamente",
                            actualizado,
                            200
                    )
            );
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<JsonResponse<Void>> eliminarUsuario(@PathVariable Long id) {
            try{
                usuarioService.deleteUsuarioById(id);
                return ResponseEntity.ok(
                        new JsonResponse<>(true, "usuario eliminado exitosamente", null, 200)
                );
            }catch (Exception e) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuario no se pudo eliminar", null, 404)
                );
            }
        }

        @GetMapping("/correo")
        public ResponseEntity<JsonResponse<UsuarioDto>> obtenerUsuarioPorCorreo(@RequestParam String correo) {
            UsuarioDto usuario = usuarioService.findByCorreo(correo);
            if (usuario==null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "usuario no encontrado", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                                    "usuario obtenido por correo exitosamente",
                            usuario,
                            200
                    )
            );
        }
        @GetMapping("userVerificate/{idUser}/rol")
        public ResponseEntity<JsonResponse<Boolean>> verificarRol(
                @PathVariable Long idUser,
                @RequestParam String rol) {

            boolean tieneRol = usuarioService.verificarRol(idUser, rol);
            if (tieneRol) {
                return ResponseEntity.ok(
                        new JsonResponse<>(true, "El usuario tiene el rol solicitado", true, 200)
                );
            } else {
                return ResponseEntity.status(403).body(
                        new JsonResponse<>(false, "El usuario no tiene el rol solicitado", false, 403)
                );
            }
        }
    }
