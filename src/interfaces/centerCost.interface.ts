
export interface CenterCostArea {
    cost_center_area: number; 
    cost_center_area_name: string;
};

export interface CenterCostSubArea {
    idcost_center_area: number; 
    cost_center_subarea: number; 
    cost_center_subarea_name: string;
};

export interface CenterCost {
    idcost_center_subarea: number; 
    cost_center: number;
    cost_center_name: string;
};