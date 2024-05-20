from flask import Flask, render_template, request
import os
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model

app = Flask(__name__, template_folder="templates")

# Load models
cotton_model_path = "E:/AgroPlus/Final project/Plant_Disease_Dection/model/v3_pred_cott_dis.h5"
tomato_model_path = "E:/AgroPlus/Final project/Plant_Disease_Dection/model/model.h5"

cotton_model = load_model(cotton_model_path)
tomato_model = load_model(tomato_model_path)

print("Models Loaded Successfully")

def predict_cotton_disease(image_path):
    test_image = load_img(image_path, target_size=(150, 150))
    test_image = img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)
    result = cotton_model.predict(test_image).round(3)
    pred = np.argmax(result)
    if pred == 0:
        return "Healthy Cotton Plant", 'cotton_templates/healthy_plant_leaf.html'
    elif pred == 1:
        return 'Diseased Cotton Plant', 'cotton_templates/disease_plant.html'
    elif pred == 2:
        return 'Healthy Cotton Plant', 'cotton_templates/healthy_plant.html'
    else:
        return "Healthy Cotton Plant", 'cotton_templates/healthy_plant.html'

def predict_tomato_disease(image_path):
    test_image = load_img(image_path, target_size=(128, 128))
    test_image = img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)
    result = tomato_model.predict(test_image)
    pred = np.argmax(result, axis=1)[0]
    templates = {
        0: 'tomato_templates/Tomato-Bacteria Spot.html',
        1: 'tomato_templates/Tomato-Early_Blight.html',
        2: 'tomato_templates/Tomato-Healthy.html',
        3: 'tomato_templates/Tomato - Late_blight.html',
        4: 'tomato_templates/Tomato - Leaf_Mold.html',
        5: 'tomato_templates/Tomato - Septoria_leaf_spot.html',
        6: 'tomato_templates/Tomato - Target_Spot.html',
        7: 'tomato_templates/Tomato - Tomato_Yellow_Leaf_Curl_Virus.html',
        8: 'tomato_templates/Tomato - Tomato_mosaic_virus.html',
        9: 'tomato_templates/Tomato - Two-spotted_spider_mite.html'
    }
    template = templates.get(pred, 'tomato_templates/Tomato-Unknown.html')
    diseases = {
        0: "Tomato - Bacteria Spot Disease",
        1: "Tomato - Early Blight Disease",
        2: "Tomato - Healthy and Fresh",
        3: "Tomato - Late Blight Disease",
        4: "Tomato - Leaf Mold Disease",
        5: "Tomato - Septoria Leaf Spot Disease",
        6: "Tomato - Target Spot Disease",
        7: "Tomato - Tomato Yellow Leaf Curl Virus Disease",
        8: "Tomato - Tomato Mosaic Virus Disease",
        9: "Tomato - Two Spotted Spider Mite Disease"
    }
    disease_name = diseases.get(pred, "Tomato - Unknown Disease")
    return disease_name, template

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template("main.html")

@app.route("/select", methods=["POST"])
def select_plant():
    plant_type = request.form["plant_type"]
    return render_template(f"{plant_type}_templates/index.html")

@app.route("/predict", methods=['POST'])
def predict():
    plant_type = request.form.get("plant_type")
    if 'image' not in request.files:
        return "No image found", 400
    file = request.files["image"]
    if file.filename == '':
        return "No image selected", 400
    filename = file.filename
    upload_folder = "static/images/upload"
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, filename)
    try:
        file.save(file_path)
    except Exception as e:
        return f"Error saving file: {str(e)}", 500
    if plant_type == "cotton":
        result, template = predict_cotton_disease(file_path)
    elif plant_type == "tomato":
        result, template = predict_tomato_disease(file_path)
    if template is None:
        return "Template not found", 404
    return render_template(template, result=result, user_image=file_path)


if __name__ == "__main__":
    app.run(debug=True)
