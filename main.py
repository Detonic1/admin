import bpy
import math

# ----------------------------------------
# Clear the existing scene
# ----------------------------------------
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# ----------------------------------------
# Create a ground plane
# ----------------------------------------
bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, 0))
ground = bpy.context.object
ground.name = "Ground"

# ----------------------------------------
# Create a simple "girl" character using basic shapes
# (Note: This is a stylized, low-poly version)
# ----------------------------------------

# Body: A cylinder for the torso
bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=2, location=(0, 0, 1))
body = bpy.context.object
body.name = "Body"

# Head: A UV sphere
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.5, location=(0, 0, 2.5))
head = bpy.context.object
head.name = "Head"

# Left Arm: A cylinder, rotated to appear at an angle
bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=1, location=(0.6, 0, 1.5))
left_arm = bpy.context.object
left_arm.rotation_euler[1] = math.radians(45)
left_arm.name = "Left_Arm"

# Right Arm: A cylinder, mirrored on the other side
bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=1, location=(-0.6, 0, 1.5))
right_arm = bpy.context.object
right_arm.rotation_euler[1] = math.radians(-45)
right_arm.name = "Right_Arm"

# Left Leg: A cylinder for the leg
bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=1.5, location=(0.3, 0, 0.25))
left_leg = bpy.context.object
left_leg.name = "Left_Leg"

# Right Leg: A cylinder for the other leg
bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=1.5, location=(-0.3, 0, 0.25))
right_leg = bpy.context.object
right_leg.name = "Right_Leg"

# Parent all parts to the body for easier manipulation
for part in [head, left_arm, right_arm, left_leg, right_leg]:
    part.parent = body

# ----------------------------------------
# Set up the camera
# ----------------------------------------
# Position the camera so that it captures the scene nicely
bpy.ops.object.camera_add(location=(5, -5, 3), rotation=(math.radians(70), 0, math.radians(45)))
camera = bpy.context.object
camera.name = "Camera"
bpy.context.scene.camera = camera  # Set this camera as the active camera

# ----------------------------------------
# Add a sun lamp for lighting
# ----------------------------------------
bpy.ops.object.light_add(type='SUN', location=(0, 0, 10))
sun = bpy.context.object
sun.data.energy = 5

# ----------------------------------------
# Set up the world background (sky color)
# ----------------------------------------
bpy.context.scene.world.use_nodes = True
bg_nodes = bpy.context.scene.world.node_tree.nodes
# Change the background color to a soft blue sky
bg_nodes["Background"].inputs[0].default_value = (0.1, 0.3, 0.5, 1)

# ----------------------------------------
# Set render settings (resolution, etc.)
# ----------------------------------------
scene = bpy.context.scene
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.film_transparent = False  # If you want an opaque background

print("Custom scene setup complete! Adjust parameters as needed for your 'perfect image'.")
