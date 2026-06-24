package com.ur2phd.alloy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AlloyController {

    @Autowired
    private AlloyRunner runner;

    @PostMapping("/run-model")
    public AlloyResult runModel(@RequestBody ModelRequest request) {
        return runner.runModel(request.getModelText());
    }
}
