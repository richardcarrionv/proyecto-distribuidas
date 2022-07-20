package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.alarm.AlarmDTO;
import com.sauriosoft.server.models.dtos.alarm.DetailedAlarmDTO;
import com.sauriosoft.server.models.entities.Alarm;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.AlarmException;
import com.sauriosoft.server.models.services.AlarmService;
import com.sauriosoft.server.models.services.IgniterService;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alarms")
public class AlarmController {

    @Autowired
    AlarmService alarmService;

    @Autowired
    IgniterService igniterService;

    @GetMapping
    public ResponseEntity<List<DetailedAlarmDTO>> getAll() {

        List<Alarm> alarms = alarmService.getAll();

        if (alarms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<DetailedAlarmDTO> detailedAlarmDTOS = alarms
                .stream()
                .map(DetailedAlarmDTO::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(detailedAlarmDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailedAlarmDTO> getById(@PathVariable(name = "id") final Long id) {
        Alarm alarm = alarmService.getById(id);
        return ResponseEntity.ok(DetailedAlarmDTO.from(alarm));
    }

    @PostMapping
    public ResponseEntity<AlarmDTO> create(@RequestBody final AlarmDTO alarmDTO) {
        if (!Objects.isNull(alarmDTO.getId())) {
            throw new AlarmException("Ya existe una alarma con la id: ".concat(alarmDTO.getId().toString()));
        }
        Igniter igniter = igniterService.getById(alarmDTO.getIgniterId());
        Alarm alarm = Alarm.from(alarmDTO, igniter);
        try {
            sendNotification();
        } catch (IOException | JSONException e) {
            throw new RuntimeException(e);
        }
        alarm = alarmService.create(alarm);
        return ResponseEntity.ok(AlarmDTO.from(alarm));
    }

      private String sendNotification() throws IOException, JSONException {

            JSONObject body = new JSONObject();
            body.put("to", "/topics/news");
          JSONObject data = new JSONObject();
          data.put("message", "Desde Spring boot" );
          data.put("coords", "0123,12312" );
          data.put("quien", "Usuario 3" );
          JSONObject notification = new JSONObject();
          notification.put("title", "Testeo Spring boot");
          notification.put("body", "Teste Spring boot body");
          notification.put("badge", 1);
          notification.put("sound", "ping.aiff");

          body.put("data", data);
          body.put("notification", notification);


         OkHttpClient client = new OkHttpClient();

         String url = "https://api.pushy.me/push?api_key=36f1c684545748d9db057ee8a90c666d479db7bba1285bc8fdbf2f1824c2af93";

        MediaType mediaType = MediaType.parse("application/json");
        okhttp3.RequestBody bodyRequest = okhttp3.RequestBody.create(body.toString(), mediaType);
        System.out.println(bodyRequest);
        Request request = new Request.Builder()
          .url(url)
          .post(bodyRequest)
          .addHeader("Content-Type", "application/json")
          .build();

        Response response = client.newCall(request).execute();
        return response.body().toString();
    }
}
