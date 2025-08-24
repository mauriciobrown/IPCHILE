package com.portafolio;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ContactoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public ContactoServlet() {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8"); // Para recibir bien los datos

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String subject = request.getParameter("subject");
        String message = request.getParameter("message");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/portafolio_db?useUnicode=true&characterEncoding=UTF-8";
            String user = "user_php";
            String pass = "user_php";
            Connection conn = DriverManager.getConnection(url, user, pass);

            try {
                CallableStatement cs = conn.prepareCall("{ call InsertarContacto(?, ?, ?, ?) }");
                cs.setString(1, name);
                cs.setString(2, email);
                cs.setString(3, subject);
                cs.setString(4, message);
                cs.execute();

                // Aquí construimos la respuesta HTML con mensaje y redirección automática
                response.getWriter().println(
                        "<!DOCTYPE html>" +
                                "<html lang='es'>" +
                                "<head>" +
                                "  <meta charset='UTF-8'>" +
                                "  <meta http-equiv='refresh' content='3; URL=index.html' />" + // Redirige a index.html
                                                                                                // en 3 segundos
                                "  <title>Mensaje Enviado</title>" +
                                "  <style>" +
                                "    body { font-family: Arial, sans-serif; background-color: #f8f9fa; text-align: center; padding-top: 100px; }"
                                +
                                "    h2 { color: #28a745; }" +
                                "  </style>" +
                                "</head>" +
                                "<body>" +
                                "<h2>Gracias. Tu mensaje fue enviado correctamente.</h2>" +
                                "</body>" +
                                "</html>");

            } finally {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("<h2>Error de base de datos: " + e.getMessage() + "</h2>");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("<h2>Error inesperado: " + e.getMessage() + "</h2>");
        }
    }
}
