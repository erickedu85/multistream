# MultiStream: A Multiresolution Streamgraph Approach to Explore Hierarchical Time Series
### A new approah to convey the hierarchical structure of multiple time series

![MultiStream](https://github.com/erickedu85/multistream/blob/master/img/multistream_gif.gif "MultiStream")

## Resume

Multiple time series are a set of multiple quantitative variables occurring at the same interval. They are present in many domains such as medicine, finance, and manufacturing for analytical purposes. In recent years, streamgraph visualization (evolved from ThemeRiver) has been widely used for representing temporal evolution patterns in multiple time series. However, streamgraph as well as ThemeRiver suffer from scalability problems when dealing with several time series. To solve this problem, multiple time series can be organized into a hierarchical structure where individual time series are grouped hierarchically according to their proximity. In this paper, we present a new streamgraph-based approach to convey the hierarchical structure of multiple time series to facilitate the exploration and comparisons of temporal evolution. Based on a focus+context technique, our method allows time series exploration at different granularities (e. g., from overview to details).

This code is the implementation of MultiStream that have been used in:

E. Cuenca, A. Sallaberry, F. Y. Wang, and P. Poncelet. MultiStream: A Multiresolution Streamgraph Approach to Explore Hierarchical Time Series. *IEEE Transactions on Visualization and Computer Graphics*, 24(12):3160-3173, 2018.

[PDF](https://hal-lirmm.ccsd.cnrs.fr/lirmm-01693077v1 "PDF") | [Video](https://youtu.be/T-Nrwif7dss "Video") | [Slides (presented at IEEE VIS 2018)](https://erickedu85.github.io/presentations/ecuenca_multistream_vis_2018.pdf "Slides (presented at IEEE VIS 2018)")


## Keywords
Streamgraph, Stacked Graph, Time Series, Aggregation, Multiresolution Visualization, Overview+detail, Focus+context, Fisheye

## Programming language
Javascript JS

## Operating systems
Cross-platform

## Authors
This application was developped by [Erick Cuenca](https://erickedu85.github.io/ "Erick Cuenca") when he was a member of the [ADVANSE](http://advanse.lirmm.fr/ "ADVANSE") team at [LIRMM](http://www.lirmm.fr/ "LIRMM").


## Getting the code
The code is hosted at [Github](https://github.com/erickedu85/multistream "Github")

Get the last version of this approach with:

	$ git clone https://github.com/erickedu85/multistream
	$ cd multistream
	

## Using
* Copy the files from the git repository to your web server (*e.g.* [HTTP Apache Server](https://httpd.apache.org/ "HTTP Apache Server"))
* Go to the web page: https://your-web-server/multistream

## Licence
[Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/ "Attribution-NonCommercial-ShareAlike 4.0 International")


