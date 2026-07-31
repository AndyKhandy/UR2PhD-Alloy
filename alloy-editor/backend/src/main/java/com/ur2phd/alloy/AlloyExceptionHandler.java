package com.ur2phd.alloy;

import edu.mit.csail.sdg.alloy4.ErrorSyntax;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class AlloyExceptionHandler {

    @ExceptionHandler({ErrorSyntax.class, IllegalArgumentException.class})
    public ResponseEntity<Map<String, String>> handleBadModel(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", exception.getMessage() == null
                        ? "Invalid Alloy model" : exception.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleUnexpectedError(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Alloy model execution failed"));
    }
}
