from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from io import BytesIO
import string
import random
from PyPDF2 import PdfReader, PdfWriter
import io
from datetime import date


def certificate_id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.SystemRandom().choice(chars) for _ in range(size))


def add_line_break(pdf_canvas, x1_position, x2_position, y_position):
    
    # Set line color (RGB format)
    line_color = (0.57, 0.57, 0.58)  # Replace with your desired RGB values
    pdf_canvas.setStrokeColorRGB(*line_color)
    
    # Draw a horizontal line
    pdf_canvas.line(x1_position, y_position, x2_position, y_position)


def add_headings(pdf_canvas, text, x_position, y_position):

    # Set the font and size
    font_name = "Helvetica"  # Replace with your desired font name
    font_size = 11
    pdf_canvas.setFont(font_name, font_size)

    pdf_canvas.drawString(x_position, y_position, text)


def add_values(pdf_canvas, text, x_position, y_position):

    # Set the font and size
    font_name = "Helvetica"  # Replace with your desired font name
    font_size = 10
    pdf_canvas.setFont(f"{font_name}-Bold", font_size)

    pdf_canvas.drawString(x_position, y_position, text)


def remove_pdf_metadata(pdf_buffer):
    
    pdf_reader = PdfReader(pdf_buffer)
    pdf_writer = PdfWriter()

    # Copy pages from the original PDF to the new PDF writer object
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        page.extract_text()
        pdf_writer.add_page(page)

    # Write the modified PDF to a new buffer
    output_buffer = io.BytesIO()
    pdf_writer.write(output_buffer)

    # Reset buffer position
    output_buffer.seek(0)
    return output_buffer


def create_pdf(certificate_id, certificate_bat_data, image_path = 'app/assets/jio-certificate-logo.png'):
    
    # Create a BytesIO buffer to store the PDF
    pdf_buffer = BytesIO()
    
    # Create a PDF document
    pdf_canvas = canvas.Canvas(pdf_buffer, pagesize=A4)

    # Get the dimensions of the A4 page
    page_width, page_height = A4
    # print(page_width, page_height)
    image_width, image_height = 555, 75

    # set the image coordinates
    x_image = (page_width - image_width) / 2
    y_image = 740

    # Add an image to the PDF
    pdf_canvas.drawImage(image_path, x_image, y_image, width=image_width, height=image_height)

    pdf_canvas.setFont("Courier-Bold", 13)
    pdf_canvas.drawString(210, 700, "Asset Usage Certificate")
    
    add_headings(pdf_canvas, "Certificate ID", x_position = 20, y_position = 710)
    add_values(pdf_canvas, certificate_id, x_position = 21, y_position = 695)
    
    add_headings(pdf_canvas, "Date of certification", x_position = 470, y_position = 710)
    add_values(pdf_canvas, date.today().strftime("%d.%m.%Y"), x_position = 471, y_position = 695)
    
    add_line_break(pdf_canvas, x1_position = 20, x2_position = 575, y_position = 680)

    pdf_canvas.setFont("Times-Bold", 12)
    pdf_canvas.drawString(260, 655, "Battery Info")
    
    add_headings(pdf_canvas, "Pack ID", x_position = 20, y_position = 630)
    add_values(pdf_canvas, certificate_bat_data['asset_name'], x_position = 21, y_position = 615)
    
    add_headings(pdf_canvas, "Nominal Energy", x_position = 200, y_position = 630)
    add_values(pdf_canvas, str(certificate_bat_data["nominal_energy_kwh"]) + " Kwh", x_position = 201, y_position = 615)
    
    add_headings(pdf_canvas, "Commissioned On", x_position = 400, y_position = 630)
    add_values(pdf_canvas, certificate_bat_data["comissioned_on"], x_position = 401, y_position = 615)
    
    # add_headings(pdf_canvas, "Battery Mileage", x_position = 20, y_position = 590)
    # add_values(pdf_canvas, "12000km", x_position = 21, y_position = 575)
    
    add_headings(pdf_canvas, "Nominal Capacity", x_position = 20, y_position = 590)
    add_values(pdf_canvas, str(certificate_bat_data["capacity_ah"]) + " Ah", x_position = 21, y_position = 575)
    
    add_headings(pdf_canvas, "Rated Voltage", x_position = 200, y_position = 590)
    add_values(pdf_canvas, str(certificate_bat_data["nominal_voltage_volt"]) + " V", x_position = 201, y_position = 575)
    
    add_line_break(pdf_canvas, x1_position = 20, x2_position = 575, y_position = 560)
    
    add_headings(pdf_canvas, "BMS-Based State of Health", x_position = 20, y_position = 540)
    add_values(pdf_canvas, str(certificate_bat_data['bms_soh']), x_position = 21, y_position = 525)
    
    # add_headings(pdf_canvas, "Temperature comfort zone usage", x_position = 200, y_position = 540)
    # add_values(pdf_canvas, "91%", x_position = 201, y_position = 525)
    
    # add_headings(pdf_canvas, "State of charge comfort zone usage", x_position = 400, y_position = 540)
    # add_values(pdf_canvas, "69.2%", x_position = 401, y_position = 525)
    
    add_line_break(pdf_canvas, x1_position = 20, x2_position = 575, y_position = 510)
    
    add_headings(pdf_canvas, "Cumulative Charge Cycles", x_position = 20, y_position = 490)
    add_values(pdf_canvas, str(certificate_bat_data['charge_cycle_count']), x_position = 215, y_position = 490)
    
    add_headings(pdf_canvas, "Total Energy Consumption", x_position = 320, y_position = 490)
    add_values(pdf_canvas, str(certificate_bat_data['cumulative_energy_consumed_kwh']) + " Kwh", x_position = 520, y_position = 490)
    
    add_headings(pdf_canvas, "Cumulative Discharge Cycles", x_position = 20, y_position = 470)
    add_values(pdf_canvas, str(certificate_bat_data['discharge_cycle_count']), x_position = 215, y_position = 470)
    
    add_headings(pdf_canvas, "Total Energy Discharged", x_position = 320, y_position = 470)
    add_values(pdf_canvas, str(certificate_bat_data['cumulative_energy_discharged_kwh']) + " Kwh", x_position = 520, y_position = 470)
    
    add_headings(pdf_canvas, "Total Charging Hours", x_position = 20, y_position = 450)
    add_values(pdf_canvas, str(certificate_bat_data['total_charge_duration_hrs']), x_position = 215, y_position = 450)
    
    add_headings(pdf_canvas, "Equivalent Full Charge Cycle", x_position = 320, y_position = 450)
    add_values(pdf_canvas, str(certificate_bat_data['equivalent_cycles_count']), x_position = 520, y_position = 450)
    
    add_headings(pdf_canvas, "Total Discharging Hours", x_position = 20, y_position = 430)
    add_values(pdf_canvas, str(certificate_bat_data['total_discharge_duration_hrs']), x_position = 215, y_position = 430)
    
    # add_headings(pdf_canvas, "Charge phases", x_position = 320, y_position = 430)
    # add_values(pdf_canvas, "120", x_position = 520, y_position = 430)
    
    # add_headings(pdf_canvas, "True full charge cycles", x_position = 20, y_position = 410)
    # add_values(pdf_canvas, "27", x_position = 215, y_position = 410)
    
    # add_headings(pdf_canvas, "Equivalent full charge cycles", x_position = 320, y_position = 410)
    # add_values(pdf_canvas, "63.6", x_position = 520, y_position = 410)
    
    add_line_break(pdf_canvas, x1_position = 20, x2_position = 575, y_position = 415)

    # Save the PDF file
    pdf_canvas.save()

    pdf_buffer.seek(0)
    pdf_buffer = remove_pdf_metadata(pdf_buffer)

    return pdf_buffer

