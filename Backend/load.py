import torch
import clip
import os
import numpy as np

def init():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model, preprocess = clip.load("ViT-B/16", device=device)

    return device, model, preprocess

def create_database():
    FEATURES_PATH = '../../CLIPFeatures'

    db = []
    for fol in os.listdir(FEATURES_PATH):
        for ft_npy in os.listdir(os.path.join(FEATURES_PATH, fol)):
            video_name = ft_npy.split('.')[0]
            ft = np.load(os.path.join(FEATURES_PATH, fol, ft_npy))
            for idx, feat in enumerate(ft):
                instance = (video_name, idx, feat)
                db.append(instance)
    return db
        