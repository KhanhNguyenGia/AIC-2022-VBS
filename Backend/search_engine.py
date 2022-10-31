import torch
import clip

def encode_text(text, device, model):
    with torch.no_grad():
        # Encode and normalize the search query using CLIP
        text_encoded = model.encode_text(clip.tokenize([text]).to(device))[0]

    # Retrieve the feature vector
    return text_encoded.detach().cpu().numpy()

def get_result(text_features, db, k=100):
    similarities = []
    for ins_id, instance in enumerate(db):
        video_name, idx, feat_arr = instance
        similarities.append((ins_id, text_features @ feat_arr.T))

    similarities = sorted(similarities, key=lambda x: x[-1], reverse=True)
    
    search_result = []
    for instance in similarities[:k]:
        ins_id, similarty = instance
        video_name, idx, _ = db[ins_id]

        search_result.append({"video_name": video_name,
                            "keyframe_id": idx})

    return search_result