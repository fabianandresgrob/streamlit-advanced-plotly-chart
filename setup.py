import setuptools

setuptools.setup(
    name="streamlit-preserve-zoom-component",
    version="0.0.1",
    author="Fabian Grob",
    author_email="grobfab@gmail.com",
    description="Custom Streamlit component to preserve zoom level of plotly charts when getting event data from them.",
    long_description="This is a custom Streamlit component to preserve zoom level of plotly charts when getting event data from them. It is based on the streamlit-plotly-events component by @null-jones. It changes the option to select the event to watch to a string.",
    long_description_content_type="text/plain",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
)
