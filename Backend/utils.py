import os


def get_image_path(results):
    IMAGE_KEYFRAME_PATH = '../KeyFrames'
    data = []
    for instance in results:
        video_name = instance['video_name']
        image_file = sorted(os.listdir(os.path.join(
            IMAGE_KEYFRAME_PATH, video_name)))[instance["keyframe_id"]]
        image_path = os.path.join(
            IMAGE_KEYFRAME_PATH, video_name, image_file)
        data.append({'image_path': image_path[3:],
                     'video_name': video_name,
                     'keyframe_id': instance['keyframe_id']})

    return data
